import { Component, OnInit } from '@angular/core';
import { Form, MultiChoiceAnswer, SingleChoiceAnswer, Submit, TextAnswer } from '../../../shared/types';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../shared/service';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../../question-card/question-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review-submit-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, HttpClientModule, MatButtonModule],
  providers: [Service],
  templateUrl: './review-submit-page.component.html',
  styleUrl: './review-submit-page.component.scss'
})
export class ReviewSubmitPageComponent implements OnInit {
    data!: Submit;

    constructor(private router: Router, private service: Service, private activatedRoute: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        const id = this.activatedRoute.snapshot.params["submitId"];
        console.log(id);
        this.data = await this.service.getSubmitDetails(id);
        this.data.formDetails?.questions.forEach((q,i) => {
            const answer = q.answer;
            if (answer instanceof TextAnswer) {
                answer.answer = this.data.answers[i] as string;
            } else if (answer instanceof SingleChoiceAnswer) {
                answer.options[this.data.answers[i] as number].selected = true;
            } else if (answer instanceof MultiChoiceAnswer) {
                (this.data.answers[i] as number[]).forEach(f => {
                    answer.options[f].selected = true
                });
            }
        })
    }

}
