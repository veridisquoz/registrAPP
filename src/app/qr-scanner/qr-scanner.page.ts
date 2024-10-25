import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  scannedData: string = '';
  private codeReader: BrowserMultiFormatReader;
  private scanning: boolean = false; // Controla el estado de escaneo

  constructor(private alertController: AlertController) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  // Inicia el escaneo cuando la vista esté activa
  ionViewWillEnter() {
    this.startScan(); // Inicia el escaneo automáticamente al entrar en la página
  }

  async startScan() {
    this.scanning = true; // Inicia el escaneo
    this.codeReader
      .decodeFromVideoDevice(undefined, this.video.nativeElement, (result, err) => {
        if (result && this.scanning) {
          this.scannedData = result.getText();
          this.scanning = false; // Detiene el procesamiento de más resultados
          this.showAlert('Escaneado correctamente', `Resultado: ${this.scannedData}`);
          this.stopScan(); // Detener el escaneo una vez se haya escaneado un código
        }
        if (err && !(err instanceof Error)) {
          console.error(err);
        }
      })
      .catch((err) => {
        console.error('Error en el escaneo: ', err);
        this.showAlert('Error', 'No se pudo iniciar el escaneo.');
      });
  }

  stopScan() {
    this.scanning = false; // Asegura que el escaneo se detenga
    // Detenemos el acceso a la cámara
    const videoElement = this.video.nativeElement;
    const stream = videoElement.srcObject as MediaStream;
  
    if (stream) {
      const tracks = stream.getTracks(); // Obtiene todas las pistas de video (stream de la cámara)
      tracks.forEach(track => track.stop()); // Detiene cada una de las pistas
      videoElement.srcObject = null; // Limpia el objeto de video
    }
  }

  ngOnDestroy() {
    this.stopScan(); // Asegura que la cámara se libere cuando salgas de la página
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
