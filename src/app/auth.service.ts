import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedKey = 'isAuthenticated';
  private usernameKey = 'username';

  constructor() {}

  login(username: string, password: string): boolean {
    
    if (username === 'donald' && password === 'trump123') {
      const usernameCapitalized = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
      localStorage.setItem(this.isAuthenticatedKey, 'true');
      localStorage.setItem(this.usernameKey, usernameCapitalized);
      return true;  
    }
      return false;  
  }

  
  logout(): void {
    localStorage.removeItem(this.isAuthenticatedKey);
    localStorage.removeItem(this.usernameKey);
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true';
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
}