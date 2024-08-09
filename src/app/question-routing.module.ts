import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/components/question-list/question-list.component';
import { AddQuestionComponent } from './question/components/add-question/add-question.component';

const routes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'create', component: AddQuestionComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
