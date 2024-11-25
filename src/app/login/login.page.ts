import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { AnimationController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private animationCtrl: AnimationController, 
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private loadingController: LoadingController
  ) {}

  async onSubmit() {
    
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent', 
    });
    await loading.present();

    const success = await this.authService.login(this.username, this.password);

    await loading.dismiss();

    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos'; 
    }
  }

  async ngOnInit() {

    await this.clearFields();
    this.cdr.detectChanges();

    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/home']);  
    }
    window.addEventListener('clear-login-form', this.clearFields.bind(this));
  }

  ngOnDestroy() {
    
    window.removeEventListener('clear-login-form', this.clearFields.bind(this));
  }

  

  ngAfterViewInit() {

    
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

  
  

  async clearFields() {
    this.username = '';
    this.password = '';
    this.cdr.detectChanges();
  }

  async logout() {
    await this.authService.logout(); 
    await this.clearFields();
    this.router.navigate(['/login']); 
  }

  

  async goToResetPassword() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
      duration: 1500
    });
  
    await loading.present();
  
    this.router.navigate(['/restablecimiento']).then(() => {
      loading.dismiss(); 
    }).catch(() => {
      loading.dismiss();
    });
  }
}

