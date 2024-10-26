import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    
    const storedUsername = await this.authService.getUsername();
    if (storedUsername) {
      this.username = storedUsername;
      
      this.email = `${this.username.toLowerCase().replace(/ /g, '')}@duocuc.cl`;
    } else {
      this.username = 'Usuario Desconocido';
      this.email = 'usuario@duocuc.cl';
    }
  }
}