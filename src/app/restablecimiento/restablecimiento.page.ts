import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.page.html',
  styleUrls: ['./restablecimiento.page.scss'],
})
export class RestablecimientoPage implements AfterViewInit {
  @ViewChild('logo', { read: ElementRef }) logo!: ElementRef;

  username: string = '';
  validUsername: string = 'donald';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    this.blinkLogo();  // Llamada para animar el logo
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
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}