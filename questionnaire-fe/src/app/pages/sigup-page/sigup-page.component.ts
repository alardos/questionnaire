import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Service } from '../../../shared/service';

@Component({
  selector: 'app-sigup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, HttpClientModule, MatButtonModule],
  providers: [Service],
  templateUrl: './sigup-page.component.html',
  styleUrl: './sigup-page.component.scss'
})
export class SigupPageComponent {
    form: FormGroup;

    constructor(private router: Router, private service: Service) {
        this.form = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
            passwordAgain: new FormControl(''),
        })
    }

    signup() {
        const raw = this.form.getRawValue();
        console.log(raw);
        this.service.signup({email:raw.email, password: raw.password}).then(() => setTimeout(() => this.router.navigate(['']),100)).catch()
    }

}
