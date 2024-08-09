import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRoutingModule } from '../candidate-routing.module';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';



@NgModule({
  declarations: [
    CandidateListComponent,
    AddCandidateComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule
  ]
})
export class CandidateModule { }
