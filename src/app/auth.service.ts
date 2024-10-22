import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedKey = 'isAuthenticated';
  private usernameKey = 'username';
  private storageInstance: Storage | null = null;

  constructor(private storage: Storage) {
    this.init(); 
  }

  async init() {
    this.storageInstance = await this.storage.create();
  }

  async login(username: string, password: string): Promise<boolean> {
    if (username === 'donald' && password === 'trump123') {
      const usernameCapitalized = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
      
      // Guardar en Ionic Storage
      await this.storageInstance?.set(this.isAuthenticatedKey, 'true');
      await this.storageInstance?.set(this.usernameKey, usernameCapitalized);
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    await this.storageInstance?.remove(this.isAuthenticatedKey);
    await this.storageInstance?.remove(this.usernameKey);
  }

  async isAuthenticated(): Promise<boolean> {
    const authStatus = await this.storageInstance?.get(this.isAuthenticatedKey);
    return authStatus === 'true';
  }

  async getUsername(): Promise<string | null> {
    return await this.storageInstance?.get(this.usernameKey);
  }
}