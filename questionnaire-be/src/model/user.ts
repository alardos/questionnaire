import { ObjectId } from "mongodb"

export class User {
    constructor(
        public email:string,
        public passHash:string,
        public _id?:ObjectId,
    ) {}

    public static from(arg:{
        _id?:ObjectId,
        email:string,
        passHash:string,
    }): User {
        return new User(arg.email,arg.passHash,arg._id);
    }
}
