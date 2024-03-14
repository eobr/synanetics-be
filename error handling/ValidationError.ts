import { StatusCodes } from 'http-status-codes';

export default class ValidationError extends Error {
    public status: number
    constructor(){
        super()
        this.status = StatusCodes.BAD_REQUEST
        this.initMessage()
    }

    public initMessage(): void{
        const message = "Validation error"
        console.log(`status: ${this.status}`, `message: ${message}`)
    }
}