import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  isAuthenticated: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {
    this.username = localStorage.getItem('username') || '';
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!this.isAuthenticated) {
      
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
    this.isAuthenticated = false;
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}