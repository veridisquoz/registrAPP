import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.page.html',
  styleUrls: ['./restablecimiento.page.scss'],
})
export class RestablecimientoPage implements AfterViewInit {
  @ViewChild('logo', { read: ElementRef }) logo!: ElementRef;

  username: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private http: HttpClient // Servicio HTTP para llamar a la API
  ) {}

  ngAfterViewInit() {
    this.blinkLogo();
  }

  async onResetPassword() {
    if (!this.username.trim()) {
      await this.showAlert('Error', 'Por favor, ingrese su nombre de usuario o correo electrónico.');
      return;
    }

    try {
      // Llama a tu API local
      const response: any = await this.http.post(
        'http://localhost:3000/reset-password', // Cambia esto si la URL es diferente
        { username: this.username }
      ).toPromise();

      if (response && response.message) {
        await this.showAlert('Solicitud Enviada', response.message);
        this.router.navigate(['/login']); // Redirige al login después de enviar el correo
      } else {
        await this.showAlert('Error', 'No se pudo procesar la solicitud. Inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      const errorMessage = (error as any)?.error?.message || 'Ocurrió un problema al procesar la solicitud. Inténtelo más tarde.';
      await this.showAlert('Error', errorMessage);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  blinkLogo() {
    if (this.logo) {
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
  }
}
