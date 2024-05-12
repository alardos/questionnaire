import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuestionCardComponent } from '../../question-card/question-card.component';
import { Form, MultiChoiceAnswer, Question, SingleChoiceAnswer, Submit, TextAnswer } from '../../../shared/types';
import { Service } from '../../../shared/service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fillout-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, HttpClientModule, MatButtonModule],
  templateUrl: './fillout-page.component.html',
  styleUrl: './fillout-page.component.scss',
  providers: [Service]
})
export class FilloutPageComponent implements OnInit {
    data!: Form;
    answers: (string | number | number[])[] = []

    constructor(private router: Router, private service: Service, private activatedRoute: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        const id = this.activatedRoute.snapshot.params["formId"];
        console.log(id);
        this.data = await this.service.getForm(id);
        this.answers = new Array(this.data.questions.length);
    }

    async answerChange(event:any) {
        console.log(event);
    }

    async submit() {
        const result: (string | number | number[])[] = [];
        this.data.questions.forEach(q => {
            const answer = q.answer;
            if (answer instanceof TextAnswer) {
                result.push(answer.answer);
            } else if (answer instanceof SingleChoiceAnswer) {
                const index = answer.options.findIndex(o => !!o.selected);
                if (index >= 0) result.push(index);
                else throw new Error();
            } else if (answer instanceof MultiChoiceAnswer) {
                const x:number[] = [];
                answer.options.forEach((o,i) => {
                    if (o.selected) x.push(i);
                });
                result.push(x);
            }
        });
        this.service.submit(Submit.from({formId:this.data._id!, answers:result}));
        this.router.navigate(['']);
    }


}
