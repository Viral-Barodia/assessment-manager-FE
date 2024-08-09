import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../environment/environment';
import { FireToastService } from './fire-toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private fireToastService: FireToastService) { }

  login(data: { email: string, password: string }) {
    return this.http.post(`${apiUrl}/auth/login`, data);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const payload = JSON.parse(atob(user));
        return payload;
      } catch (error) {
        console.error("Error decoding token", error);
        return null;
      }
    }
    return null;
  }

  getToken() {
    try {
        const encodedUser = localStorage.getItem('user');
        if (encodedUser) {
          return (JSON.parse(atob(encodedUser))).token;    
        } else {
          this.fireToastService.fireErrorToast("No data in the localStorage");
          return null;
        }
    } catch (error) {
      this.fireToastService.fireErrorToast("Error fetching data from localstorage, logout and try again");
        return null;
    }
  }
}
