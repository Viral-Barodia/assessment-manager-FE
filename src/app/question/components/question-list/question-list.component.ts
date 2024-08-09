import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { FireToastService } from '../../../_core/services/fire-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {

  questions: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalQuestions: number = 0;
  totalPages: number = 0;

  constructor(private questionService: QuestionService, private fireToastService: FireToastService, private router: Router) {}

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions(): void {
    this.questionService.getAllQuestions(this.page, this.limit).subscribe(
      (response: any) => {
        this.questions = response.data.questions;
        this.totalQuestions = response.data.total;
        this.totalPages = Math.ceil(this.totalQuestions/this.limit);
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchQuestions();
  }

  onEditQuestion(question: any): void {
    this.router.navigate(['/question/create', question]);
  }

  onDeleteQuestion(question: any): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(question._id).subscribe(
        (response: any) => {
          this.fireToastService.fireSuccessToast(response.message);
          this.fetchQuestions();
        },
        (error: any) => {
          this.fireToastService.fireErrorToast(error.error.message);
        }
      );
    }
  }
}
