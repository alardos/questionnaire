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
      if (arg.answer._type === 'text') {
          return new Question(arg.question,new TextAnswer(arg.answer.answer))
      } else if (arg.answer._type === 'single') {
          return new Question(arg.question,new SingleChoiceAnswer(arg.answer.options))
      } else if (arg.answer._type === 'multi') {
          return new Question(arg.question,new MultiChoiceAnswer(arg.answer.options))
      } else {
          return new Question(arg.question,arg.answer)
      }

    };
}

export class TextAnswer {
    readonly _type = 'text';
    constructor(public answer:string='') {}
}

export type Option = {value: string, selected?:boolean, correct?: boolean};
export class SingleChoiceAnswer {
    readonly _type = 'single';
    constructor(public options: Option[] = []) {}
}

export class MultiChoiceAnswer {
    readonly _type = 'multi';
    constructor(public options: Option[] = []) {}
}

export class Form {
    constructor(public name: string, public questions: Question[], public _id?: string) {}
    static from(arg:{
        name: string,
        questions: Question[],
        _id?: string
    }) {
        return new Form(arg.name,arg.questions.map(Question.from),arg._id);
    }

}

export class Submit {
    constructor(
        public answers: (string | number | number[])[],
        public formId: string,
        public submiterId?: string,
        public formDetails?:Form,
        public _id?: string,
    ) {}

    static from(arg: {
        answers: (string | number | number[])[],
        formId: string,
        submiterId?: string,
        formDetails?: Form,
        _id?: string
    }): Submit {
        return new Submit(arg.answers,arg.formId,arg.submiterId,arg.formDetails ? Form.from(arg.formDetails):undefined,arg._id);
    }


}
