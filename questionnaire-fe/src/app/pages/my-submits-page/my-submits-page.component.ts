import { Component } from '@angular/core';
import { Form, Submit } from '../../../shared/types';
import { Service } from '../../../shared/service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-my-submits-page',
    standalone: true,
    imports: [CommonModule, HttpClientModule, MatCardModule, MatListModule, RouterLink, MatIconModule, MatButtonModule],
    providers: [Service, RouterLink],
    templateUrl: './my-submits-page.component.html',
    styleUrl: './my-submits-page.component.scss'
})
export class MySubmitsPageComponent {
    submits: Submit[] = [];

    constructor(private service: Service) { }

    async ngOnInit(): Promise<void> {
        console.log("onInit");
        this.submits = await this.service.getMySubmits();
    }

}
