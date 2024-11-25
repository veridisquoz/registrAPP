import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { AuthService } from '../auth.service'; 
import { WeatherService } from '../weather.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  nombre: string = '';
  city: string = 'Ubicación actual';  
  weatherData: any;
  errorMessage: string = ''; 
  loadingWeather: boolean = false; 

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController,
    private animationCtrl: AnimationController, 
    private el: ElementRef,
    private weatherService: WeatherService,
    private loadingController: LoadingController 
  ) {}

  async navigateWithLoading(url: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await loading.present();

    this.router.navigateByUrl(url).then(() => {
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    });
  }


  async ngOnInit() {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);  
      return;
    }

    this.nombre = await this.authService.getNombre() || '';
    this.presentWelcomeAlert();
    this.getWeatherWithLocation();
  }

  async getWeatherWithLocation() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo ubicación y clima...',
      spinner: 'crescent',
    });
    await loading.present();
  
    try {
      
      const coords = await this.getCurrentLocation();

      const weatherData = await this.weatherService
        .getWeatherByCoordinates(coords.lat, coords.lon)
        .toPromise();

      this.weatherData = weatherData;

      this.city = weatherData.name;

      if (weatherData.name === 'Santiago', 'Ñuñoa', 'San Joaquín', 'Providencia') {
        this.city = `Santiago`;
      } else {
        this.city = `${weatherData.name}`;
      }
  

      await loading.dismiss();
    } catch (error) {
      console.error('Error al obtener los datos del clima:', error);
      this.errorMessage = 'No se pudo obtener el clima.';
    }
  }

  
  getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject('No se pudo obtener la ubicación.');
          }
        );
      } else {
        reject('La geolocalización no está soportada en este navegador.');
      }
    });
  }

  


  ngAfterViewInit() {
    
  }

  async presentWelcomeAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `¡Bienvenido, ${this.nombre}!`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  blinkButtons() {
    const buttons = this.el.nativeElement.querySelectorAll('.menu-button');
    buttons.forEach((button: HTMLElement) => {
      const animation = this.animationCtrl
        .create()
        .addElement(button)
        .duration(4000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, opacity: '1' },
          { offset: 0.7, opacity: '0.5' },
          { offset: 1, opacity: '1' }
        ]);
      animation.play();
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cerrando sesión...',
              spinner: 'crescent',
              duration: 2000,
            });
  
            await loading.present();
  
            try {
              await this.authService.logout(); 
              await this.router.navigate(['/login']);
              window.dispatchEvent(new Event('clear-login-form'));
            } finally {
              await loading.dismiss();
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
}
