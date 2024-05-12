import { ChangeDetectorRef, Component } from '@angular/core';
import { Form } from '../../../shared/types';
import { Service } from '../../../shared/service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-forms-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatListModule, RouterLink, MatIconModule, MatButtonModule],
  providers: [Service, RouterLink],
  templateUrl: './my-forms-page.component.html',
  styleUrl: './my-forms-page.component.scss'
})
export class MyFormsPageComponent {
    forms: Form[] = [];

    constructor(private router: Router, private service: Service) { }

    async ngOnInit(): Promise<void> {
        this.forms = await this.service.getMyForms();
    }

    delete(form:Form) {
        this.service.deleteForm(form._id!);
    }

    edit(form:Form) {
        this.router.navigate(['/create',form._id!]);
    }

}
