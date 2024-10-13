import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  @ViewChild('logo', { read: ElementRef }) logo!: ElementRef;

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private animationCtrl: AnimationController, private el: ElementRef) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);  
    }
  }

  ngAfterViewInit() {

    this.blinkLogo();
  }

  blinkLogo() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.logo.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: '1' },
        { offset: 0.5, opacity: '0.3' },  
        { offset: 1, opacity: '1' }    
      ]);
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