import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { BrowserMultiFormatReader } from '@zxing/browser';
import IAttendance from 'src/app/interfaces/attendances.interfaces';


@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  private codeReader: BrowserMultiFormatReader;
  scannedData: string = '';
  scanning: boolean = false;

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ionViewWillEnter() {
    this.startScan();
  }

  async startScan() {
    this.scanning = true;
    this.codeReader.decodeFromVideoDevice(undefined, this.video.nativeElement, async (result, err) => {
      if (result && this.scanning) {
        this.scannedData = result.getText();
        this.scanning = false;
        await this.processQrData(this.scannedData);
        this.stopScan();
      }
      if (err && !(err instanceof Error)) {
        console.error(err);
      }
    });
  }

  stopScan() {
    this.scanning = false;
    const stream = this.video.nativeElement.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    this.video.nativeElement.srcObject = null;
  }

  async processQrData(data: string) {
    const [subject, section, room, date] = data.split('|');
    const username = await this.authService.getUsername();
 
    if (!username || !subject || !section || !room || !date) {
      this.showAlert('Error', 'Formato de QR inválido');
      return;
    }

    const confirmed = await this.showConfirmation('Confirmar asistencia', `¿Registrar asistencia para ${subject} en ${room} el ${date}?`);

    if (!confirmed) {
    return;
  }
 
    const attendanceData: IAttendance = {
      username,
      subject,
      section,
      room,
      date,
      attendance: true
    };
 
    try {
      await this.attendanceService.registrarAttendance(attendanceData);
      await this.showAlert('Asistencia', 'Asistencia registrada correctamente');
    } catch (error) {
      if ((error as any).status === 409) {
        await this.showAlert('Asistencia', 'Su asistencia ya ha sido registrada');
      } else {
        await this.showAlert('Error', 'Error al registrar la asistencia');
      }
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async showConfirmation(header: string, message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => false,
        },
        {
          text: 'Confirmar',
          handler: () => true,
        },
      ],
    });
  
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role !== 'cancel';
  }

  ngOnDestroy() {
    this.stopScan();
  }
}