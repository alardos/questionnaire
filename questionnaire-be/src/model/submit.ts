import { ObjectId } from "mongodb";
import { Form } from "./form";

export class Submit { 
    constructor(
        public answers: (string | number | number[])[],
        public submiterId: ObjectId,
        public formId: ObjectId,
        public formDetails?: Form,
        public _id?: ObjectId,
    ) {}

    static from(arg: {
        answers: (string | number | number[])[],
        submiterId: ObjectId,
        formId: ObjectId,
        formDetails?: Form,
        _id?: ObjectId
    }): Submit {
        return new Submit(arg.answers,arg.submiterId,arg.formId,arg.formDetails,arg._id);
    }


}
