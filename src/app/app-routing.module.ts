import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminAuthGuard } from './_core/guards/authGuard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'question', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule), canActivate: [AdminAuthGuard] },
  { path: 'candidate', loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
