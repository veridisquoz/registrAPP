import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { AnimationController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('logo', { read: ElementRef }) logo!: ElementRef;

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private animationCtrl: AnimationController, 
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.clearFields();
    this.cdr.detectChanges();

    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/home']);  
    }
  }

  async onSubmit() {
    const success = await this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']);  
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos'; 
    }
  }

  async clearFields() {
    this.username = '';
    this.password = '';
    this.errorMessage = ''; 
    this.cdr.detectChanges();
  }

  async logout() {
    await this.authService.logout(); 
    await this.clearFields();
    this.router.navigate(['/login']); 
  }

  goToResetPassword() {
    this.router.navigate(['/restablecimiento']);
  }
}