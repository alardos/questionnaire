import { ObjectId } from "mongodb"

export class Form {
    constructor(
        public name: string,
        public questions:Question[],
        public ownerId:ObjectId,
        public _id?:ObjectId,
    ) {}
}

export type Answer = TextAnswer | SingleChoiceAnswer | MultiChoiceAnswer;
export class Question {
    constructor(
        public question: string,
        public answer: Answer
    ) {}

    static from(arg: {
        question: string,
        answer: Answer
    }) {
      return new Question(arg.question,arg.answer)
    };
}

export class TextAnswer {
    readonly _type = 'text';
    constructor(public answer:string='') {}
}

export type Option = {value: string, correct?: boolean};
export class SingleChoiceAnswer {
    readonly _type = 'single';
    constructor(public options: Option[] = []) {}
}

export class MultiChoiceAnswer {
    readonly _type = 'multi';
    constructor(public options: Option[] = []) {}
}
