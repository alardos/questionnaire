import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Service } from '../../../shared/service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, HttpClientModule, MatButtonModule],
  providers: [Service],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
    form: FormGroup;

    constructor(private router: Router, private service: Service) {
        this.form = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        })
    }

    login() {
        this.service.login(this.form.getRawValue()).then(() => setTimeout(() => this.router.navigate(['']),100)).catch()
    }
    signup() {
        this.router.navigate(['/signup']);
    }
}


