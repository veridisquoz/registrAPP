import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.username === 'donald' && this.password === 'trump123') {
      
      const usernameCapitalized = this.username.charAt(0).toUpperCase() + this.username.slice(1).toLowerCase();
      localStorage.setItem('username', usernameCapitalized);
      localStorage.setItem('isAuthenticated', 'true');

      
      this.router.navigate(['/home'], { state: { username: usernameCapitalized } });
    } else {
      this.errorMessage = 'Usuario o Contraseña incorrectos';
    }
  }

  goToResetPassword() {
    this.router.navigate(['/restablecimiento']);
  }
}