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

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, { username, password }).toPromise();
      this.currentUser = {
        ...response.user,
        nombre: this.capitalize(response.user.nombre),
      };
      this.isLoggedIn = true;
      return true;
    } catch (error) {
      console.error('Error en el login:', error);
      return false;
    }
  }

  
  async isAuthenticated(): Promise<boolean> {
    return this.isLoggedIn;
  }

  async getUsername(): Promise<string | null> {
    return this.currentUser ? this.currentUser.username : null;
  }

  getUserProfile(): any {
    if (this.currentUser) {
      return {
        ...this.currentUser,
        nombre: this.capitalize(this.currentUser.nombre),
      };
    }
    return null;
  }
  
  async getNombre(): Promise<string | null> {
    return this.currentUser ? this.currentUser.nombre : null;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.isLoggedIn = false;
  }

  private capitalize(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
