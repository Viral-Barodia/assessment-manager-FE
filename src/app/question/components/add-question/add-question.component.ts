import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { FireToastService } from '../../../_core/services/fire-toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  editMode = false;
  questionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private fireToastService: FireToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array(
        Array.from({ length: 4 }, () =>
          this.fb.group({
            optionText: ['', Validators.required],
            isCorrect: [false]
          })
        )
      ),
      marks: [0, [Validators.required, Validators.min(0)]],
      negativeMarks: [0, [Validators.min(0)]],
      tags: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const question = this.route.snapshot.data['question'];
      if (question) {
        this.editMode = true;
        this.questionId = question._id;
        this.populateForm(question);
      }
    });
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  populateForm(question: any): void {
    this.questionForm.patchValue({
      questionText: question.questionText,
      marks: question.marks,
      negativeMarks: question.negativeMarks,
      tags: question.tags.join(',')
    });

    this.options.clear();
    question.options.forEach((option: any) => {
      this.options.push(
        this.fb.group({
          optionText: [option.optionText, Validators.required],
          isCorrect: [option.isCorrect]
        })
      );
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formattedOptions = this.options.value.map((opt: any) => ({
        optionText: opt.optionText,
        isCorrect: opt.isCorrect
      }));

      const questionData = {
        ...this.questionForm.value,
        options: formattedOptions
      };

      if (this.editMode) {
        this.questionService.updateQuestion(this.questionId, questionData).subscribe(
          (response: any) => {
            this.fireToastService.fireSuccessToast(response.message);
            this.router.navigate(['/questions']);
          },
          (error: any) => {
            this.fireToastService.fireErrorToast(error.error.message);
          }
        );
      } else {
        this.questionService.addQuestion(questionData).subscribe(
          (response: any) => {
            this.fireToastService.fireSuccessToast(response.message);
            this.router.navigate(['/questions']);
          },
          (error: any) => {
            this.fireToastService.fireErrorToast(error.error.message);
          }
        );
      }
    } else {
      this.questionForm.markAllAsTouched();
    }
  }
}