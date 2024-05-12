import { Routes } from '@angular/router';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { FilloutPageComponent } from './pages/fillout-page/fillout-page.component';
import { AuthGuard } from '../shared/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UnauthGuard } from '../shared/unauth.guard';
import { MyFormsPageComponent } from './pages/my-forms-page/my-forms-page.component';
import { SigupPageComponent } from './pages/sigup-page/sigup-page.component';
import { MySubmitsPageComponent } from './pages/my-submits-page/my-submits-page.component';
import { ReviewSubmitPageComponent } from './pages/review-submit-page/review-submit-page.component';

export const routes: Routes = [
  {path: '', component: StartingPageComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
  {path: 'create/:templateId', component: CreatePageComponent, canActivate: [AuthGuard]},
  {path: 'my-submits', component: MySubmitsPageComponent, canActivate: [AuthGuard]},
  {path: 'review-submit/:submitId', component: ReviewSubmitPageComponent, canActivate: [AuthGuard]},
  {path: 'my-forms', component: MyFormsPageComponent, canActivate: [AuthGuard]},
  {path: 'fillout/:formId', component: FilloutPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SigupPageComponent},

];
