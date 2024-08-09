import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionRoutingModule } from '../question-routing.module';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuestionListComponent,
    AddQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class QuestionModule { }
