import request from "supertest";
import app from "../app"; 

describe("User Routes", () => {

  it("POST /user/:id should add a new user", async () => {
    const response = await request(app).post("/api/user/1");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User 1 added successfully" });
  });

  it("POST /user/:id/basket should add an item to user's basket", async () => {
    await request(app).post("/api/user/2");
    const response = await request(app)
      .post("/api/user/2/basket")
      .send({ name: "Test Product", price: 10.99 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Item Test Product added to user 2's basket",
    });

    const basketResponse = await request(app).get("/api/user/2/basket");
    expect(basketResponse.status).toBe(200);
    expect(basketResponse.body).toContainEqual({
      name: "Test Product",
      price: 10.99,
    });
  });

  it("DELETE /user/:id/basket should remove an item from user's basket", async () => {
    await request(app).post("/api/user/3");
    await request(app)
      .post("/api/user/3/basket")
      .send({ name: "Test Product 2", price: 7.99 });

    const deleteResponse = await request(app)
      .delete("/api/user/3/basket")
      .send({ name: "Test Product 2" });
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({
      message: "Item Test Product 2 removed from user 3's basket",
    });

    const basketResponse = await request(app).get("/api/user/3/basket");
    expect(basketResponse.status).toBe(200);
    expect(basketResponse.body).not.toContainEqual({
      name: "Test Product 2",
      price: 7.99,
    });
  });

  it("GET /user/:id/basket should return user's basket", async () => {
    await request(app).post("/api/user/4");
    const response = await request(app).get("/api/user/4/basket");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /user/:id/basket/total should return total price of user's basket", async () => {
    await request(app).post("/api/user/5");
    await request(app)
      .post("/api/user/5/basket")
      .send({ name: "Product 1", price: 5.99 });
    await request(app)
      .post("/api/user/5/basket")
      .send({ name: "Product 2", price: 3.49 });

    const response = await request(app).get("/api/user/5/basket/total");
    expect(response.status).toBe(200);
    expect(typeof response.body.total).toBe("number");
  });

  it("GET /user/:id/basket/displayTotal should return total price of user's basket as a string", async () => {
    await request(app).post("/api/user/6");
    await request(app)
      .post("/api/user/6/basket")
      .send({ name: "Product 1", price: 5.99 });
    await request(app)
      .post("/api/user/6/basket")
      .send({ name: "Product 2", price: 3.49 });

    const response = await request(app).get("/api/user/6/basket/displayTotal");
    expect(response.status).toBe(200);
    expect(typeof response.body.total).toBe("string");
  });

  it("POST /user/:id/basket/applyDiscounts should apply discounts to user's basket", async () => {
    await request(app).post("/api/user/7");
    await request(app)
      .post("/api/user/7/basket")
      .send({ name: "Product 1", price: 10 });
    await request(app)
      .post("/api/user/7/basket")
      .send({ name: "Product 2", price: 10 });

    const response = await request(app)
      .post("/api/user/7/basket/applyDiscounts")
      .send({ discountCode: "twenty" });
    expect(response.status).toBe(200);
    expect(response.body.discountedTotal).toBe("16.00");
  });
});