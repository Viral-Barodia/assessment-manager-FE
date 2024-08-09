import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../environment/environment';
import { AuthService } from '../../_core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  token;
  constructor(private http: HttpClient, private authService: AuthService) { 
    this.token = this.authService.getToken();
    console.log(this.token);
  }

  addQuestion(questionData: any) {
    let httpHeaders = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.http.post(`${apiUrl}/question/create`, questionData, { headers: httpHeaders });
  }
  
  getAllQuestions(page: number, limit: number) {
    let httpHeaders = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.http.get(`${apiUrl}/question?page=${page}&limit=${limit}`, { headers: httpHeaders });
  }

  deleteQuestion(id: any) {
    let httpHeaders = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.http.delete(`${apiUrl}/question/delete/${id}`, { headers: httpHeaders });
  }
  
  updateQuestion(questionId: any, questionData: any) {
    let httpHeaders = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.http.put(`${apiUrl}/question/${questionId}`, questionData, { headers: httpHeaders });
  }
}
