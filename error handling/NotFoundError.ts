import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends Error {
    public status: number
    constructor(query: object){
        super()
        this.status = StatusCodes.NOT_FOUND
        this.initMessage(query)
    }

    public initMessage(query: object): void{
        const key = Object.keys(query)[0]
        const value = Object.values(query)[0]
        const message = `"${key} ${value}" not found`
        console.log(`status: ${this.status}`, `message: ${message}`)
    }
}