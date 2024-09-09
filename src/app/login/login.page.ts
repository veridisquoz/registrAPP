import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);  
    }
  }

  onSubmit() {
    
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);  
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos'; 
    }
  }

  goToResetPassword() {
    this.router.navigate(['/restablecimiento']);
  }
}