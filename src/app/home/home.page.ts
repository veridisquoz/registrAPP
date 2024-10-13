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
    private animationCtrl: AnimationController, // Inyectar el AnimationController
    private el: ElementRef // ElementRef para acceder a los botones
  ) {
    this.username = this.authService.getUsername() || '';

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);  
    } else {
      this.presentWelcomeAlert(); 
    }
  }

  ngAfterViewInit() {
    this.blinkButtons();  // Llamar a la animación de parpadeo en los botones
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
    const buttons = this.el.nativeElement.querySelectorAll('.menu-button'); // Seleccionar los botones
    buttons.forEach((button: HTMLElement) => {
      const animation = this.animationCtrl
        .create()
        .addElement(button)
        .duration(4000)  // Duración de 2 segundos
        .iterations(Infinity)  // Animación infinita
        .keyframes([
          { offset: 0, opacity: '1' },
          { offset: 0.7, opacity: '0.5' },  // Atenuar, pero sin desaparecer
          { offset: 1, opacity: '1' }
        ]);
      animation.play();
    });
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}