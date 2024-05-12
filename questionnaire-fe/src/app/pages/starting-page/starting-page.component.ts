import { Component, OnInit } from '@angular/core';
import { Service } from '../../../shared/service';
import { Form } from '../../../shared/types';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-starting-page',
    standalone: true,
    templateUrl: './starting-page.component.html',
    styleUrl: './starting-page.component.scss',
    imports: [CommonModule, HttpClientModule, MatCardModule, MatListModule, RouterLink, MatIconModule, MatButtonModule],
    providers: [Service, RouterLink]
})
export class StartingPageComponent implements OnInit {
    forms: Form[] = [];

    constructor(private service: Service) { }

    async ngOnInit(): Promise<void> {
        console.log("onInit");
        this.forms = await this.service.readAllForm();
    }

    nav(form: Form) {
        console.log(form);
    }

}
