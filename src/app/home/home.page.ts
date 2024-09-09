import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {
    
    this.username = this.authService.getUsername() || '';

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);  
    } else {
      this.presentWelcomeAlert(); 
    }
  }

  async presentWelcomeAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `¡Bienvenido, ${this.username}!`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}