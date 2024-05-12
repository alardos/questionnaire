import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option, MultiChoiceAnswer, Question, SingleChoiceAnswer, TextAnswer } from '../../shared/types';
import {MatCardModule} from '@angular/material/card';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormGroup, FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, MatListModule, FormsModule, MatButtonModule, MatIconButton, MatIconModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent implements OnInit {
    _type: 'single' | 'multi' | 'text' | '' = '';
    newAnswerValue: string = "";

    @Input() data!: Question;
    @Input() edit: boolean = false;
    @Input() review: boolean = false;
    @Output('delete') deleteEventEmitter = new EventEmitter<void>();
    @Output('answer') answerEmitter = new EventEmitter<string | number | number[]>();

    ngOnInit(): void {
        console.log(this.edit);
        console.log(this.data);
        if (this.data.answer instanceof TextAnswer) {
            this._type = "text";
        } else if (this.data.answer instanceof SingleChoiceAnswer) {
            this._type = "single";
        } else if (this.data.answer instanceof MultiChoiceAnswer) {
            this._type = "multi";
        }
        console.log(this._type);
    }

    typing(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if ('options' in this.data.answer) {
                console.log("now");
                this.data.answer.options.push({value:this.newAnswerValue});
                this.newAnswerValue = "";
            }
        }
    }

    delete(deletee: Option) {
        if ('options' in this.data.answer) {
            this.data.answer.options = this.data.answer.options.filter((option => option !== deletee))
        }
    }

    deleteQuestion() {
        this.deleteEventEmitter.emit();
    }




}
