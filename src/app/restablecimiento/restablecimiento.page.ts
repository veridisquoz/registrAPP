import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.page.html',
  styleUrls: ['./restablecimiento.page.scss'],
})
export class RestablecimientoPage {
  username: string = '';
  validUsername: string = 'donald';

  constructor(private router: Router, private alertController: AlertController) {}

  async onResetPassword() {
    if (this.isValidUsername(this.username)) {
      await this.showAlert('Solicitud Enviada', 'Se ha enviado un enlace de restablecimiento a su correo electrónico.');
    } else {
      await this.showAlert('Error', 'Por favor, ingrese un nombre de usuario válido.');
    }
  }

  isValidUsername(username: string): boolean {
    return username === this.validUsername;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}