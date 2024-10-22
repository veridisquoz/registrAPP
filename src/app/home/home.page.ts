import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  username: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController,
    private animationCtrl: AnimationController, 
    private el: ElementRef 
  ) {}

  async ngOnInit() {
    
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);  
      return;
    }

    this.username = await this.authService.getUsername() || '';
    this.presentWelcomeAlert(); 
  }

  ngAfterViewInit() {
    this.blinkButtons();
  }

  async presentWelcomeAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `¡Bienvenido, ${this.username}!`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  blinkButtons() {
    const buttons = this.el.nativeElement.querySelectorAll('.menu-button');
    buttons.forEach((button: HTMLElement) => {
      const animation = this.animationCtrl
        .create()
        .addElement(button)
        .duration(4000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, opacity: '1' },
          { offset: 0.7, opacity: '0.5' },
          { offset: 1, opacity: '1' }
        ]);
      animation.play();
    });
  }

  async logout() {
    await this.authService.logout(); 
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}