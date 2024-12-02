import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private modalController: ModalController) {}

  ngOnInit() {
    this.user = this.authService.getUserProfile();
  }
}
