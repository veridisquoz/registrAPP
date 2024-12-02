import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUser: any = null;
  private isLoggedIn = false;

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, { username, password }).toPromise();

      if (response && response.user) {
        // Guardar todos los datos del usuario en memoria
        this.currentUser = response.user;
        this.isLoggedIn = true;
        console.log('Usuario autenticado:', this.currentUser); // Log para depuración
        return true; // Inicio de sesión exitoso
      } else {
        throw new Error('La respuesta no contiene datos de usuario.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      return false; // Falló el inicio de sesión
    }
  }

  // Verifica si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    return this.isLoggedIn;
  }

  // Obtiene el nombre de usuario
  async getUsername(): Promise<string | null> {
    return this.currentUser ? this.currentUser.username : null;
  }

  // Obtiene el perfil completo del usuario
  getUserProfile(): any {
    if (this.currentUser) {
      return {
        username: this.currentUser.username,
        nombre: this.capitalize(this.currentUser.nombre),
        idEstudiante: this.currentUser.idEstudiante,
        carrera: this.currentUser.carrera,
        email: this.currentUser.email,
      };
    }
    return null; // Retorna null si no hay usuario autenticado
  }

  // Obtiene el nombre completo del usuario
  async getNombre(): Promise<string | null> {
    return this.currentUser ? this.capitalize(this.currentUser.nombre) : null;
  }

  // Cierra la sesión del usuario
  async logout(): Promise<void> {
    this.currentUser = null;
    this.isLoggedIn = false;
  }

  // Capitaliza el nombre del usuario
  private capitalize(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Método para cambiar la contraseña
  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/change-password`, {
        username: this.currentUser.username,
        currentPassword,
        newPassword,
      }).toPromise();

      if (response && response.success) {
        return true; // Cambio de contraseña exitoso
      } else {
        return false; // Falló el cambio de contraseña
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      return false; // Falló el cambio de contraseña
    }
  }
}
