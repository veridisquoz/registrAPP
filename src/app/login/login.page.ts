import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  @ViewChild('loginTitle', { read: ElementRef }) loginTitle!: ElementRef;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private animationCtrl: AnimationController) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);  
    }
  }

  ngAfterViewInit() {
    this.blinkTitle();
  }

  blinkTitle() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.loginTitle.nativeElement) 
      .duration(2000)  
      .iterations(Infinity)  
      .keyframes([
        { offset: 0, opacity: '1' },
        { offset: 0.5, opacity: '0.1' },
        { offset: 1, opacity: '1' }
      ]);  //
    animation.play();  
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