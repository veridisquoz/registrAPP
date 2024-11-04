import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUser: any = null;
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, { username, password }).toPromise();
      this.currentUser = response.user;
      this.isLoggedIn = true;
      return true;
    } catch (error) {
      console.error('Error en el login:', error);
      return false;
    }
  }

  // Método para verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    return this.isLoggedIn;
  }

  // Método para obtener el nombre de usuario
  async getUsername(): Promise<string | null> {
    return this.currentUser ? this.currentUser.username : null;
  }

  // Método para obtener el perfil de usuario
  getUserProfile(): any {
    return this.currentUser;
  }

  // Método de cierre de sesión
  async logout(): Promise<void> {
    this.currentUser = null;
    this.isLoggedIn = false;
  }
}
