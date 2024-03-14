# README - Synanetics Tech Test

## Prerequisites

- Node
- npm

## Getting Started

Before attempting anything, ensure you have run `npm i` in this directory to install all dependencies.

## Testing

All tests are in the `test` directory. We use `ts-jest` and `supertest` to test our server. Run `npm test` to execute tests.

## Running The Server

Run `npm start` to run the server. It is configured to run on localhost:9090 by default.

## Endpoints

- `/api`
  - GET - Returns a 200 and an `ok` message when the server is online

- `/api/user/:id`
  - POST - Creates a new temporary user. User will stop existing when server is stopped
        No body required

- `/api/user/:id/basket` 
  - GET - Returns a list of all products in the user's (id)basket
  - POST - Adds a new item to the user's basket
        
        Example body:

        {
            "name": "example product", 
            "price": 10.99
        }
        
  - DELETE - Returns a 200 and a confirmation message

         Example body:

        {
            "name": "example product"
        }

- `/api/user/:id/basket/total` 
  - GET - Returns a 200 and a tally of the total price of all items in the basket as a NUMBER

- `/api/user/:id/basket/displayTotal` 
  - GET - Returns a 200 and a tally of the total price of all items in the basket as a STRING to 2 decimal places.

- `/api/user/:id/basket/applyDiscounts` 
  - POST - Returns a 200 and the new discounted total

            example body: 
            { "discountCode": "exampleDiscountCode" }
            
        usable discount codes: "twenty" and "fifty" only


- `/api/products`
    - GET - returns all products in the database
    - POST - adds a new prodict to the database

            example body:
            {
                "name": "example product",
                "price": 10.54
            }
    
    - DELETE - deletes a product from the database

            example body:
            {
                "productName": "example product"
            }
  

## Notes

I really enjoyed making this API, I tried to make it as fleshed out as possible, including Schema validation for multiple endpoints (but not all), tests for all endpoints, and custom error classes.

With more time I would have added a database for users, more testing of my error handling (write tests for sending a wrong body for example), authorization for endpoints, more error classes, and changed the products database to have a property of 'id' whcih would make the POST and DELETE requests involving products a lot smoother.