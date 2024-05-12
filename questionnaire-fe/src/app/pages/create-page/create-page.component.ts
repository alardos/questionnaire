import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Form, MultiChoiceAnswer, Question, SingleChoiceAnswer, TextAnswer } from '../../../shared/types';
import { QuestionCardComponent } from '../../question-card/question-card.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { Service } from '../../../shared/service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, MatButtonModule, HttpClientModule, MatFormFieldModule, MatInputModule, FormsModule],
  providers: [Service],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss'
})
export class CreatePageComponent implements OnInit{
    update: boolean = false;
    questions: Question[] = [];
    name: string = "";
    templateId?: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: Service) {
    }

    async ngOnInit(): Promise<void> {
        this.templateId = this.activatedRoute.snapshot.params["templateId"];
        if (this.templateId) {
            const template = await this.service.getForm(this.templateId)
            this.questions = template.questions;
            this.name = template.name;
        }
        console.log(!!this.templateId);
    }


    addText() {
        this.questions.push(Question.from({
            question: '',
            answer: new TextAnswer(),
        }));
    }
    addSingle() {
        this.questions.push(Question.from({
            question: '',
            answer: new SingleChoiceAnswer(),
        }));
    }

    addMulti() {
        this.questions.push(Question.from({
            question: '',
            answer: new MultiChoiceAnswer(),
        }));
    }

    delete(question:Question) {
        this.questions = this.questions.filter((q) => q !== question);
    }

    async save() {
        if (this.templateId) await this.service.deleteForm(this.templateId);
        this.service.saveForm(new Form(this.name,this.questions));
        this.router.navigate(["/my-forms"]);
    }

}
