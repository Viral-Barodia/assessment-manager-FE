import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_core/services/auth.service';
import { FireToastService } from '../../_core/services/fire-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fireToastService: FireToastService,
              private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    if(this.loginForm.valid) {
      const dataToSend = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.login(dataToSend).subscribe((response: any) => {
        if(!response.hasError) {
          localStorage.setItem('user', btoa(JSON.stringify(response.data)));
          this.fireToastService.fireSuccessToast(response.message);
          this.router.navigate(['/candidate']);
        } else {
          this.fireToastService.fireErrorToast(response.message);
        }
      } , (error: any) => {
        this.fireToastService.fireErrorToast(error.error.message);
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}