import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  studentName: string = '';
  subject: string = '';
  attendance: boolean = false;
  attendanceRecords: { studentName: string, subject: string, attendance: boolean }[] = [];

  subjects: string[] = ['PROGRAMACION DE APLICACIONES MOVILES', 'CALIDAD DE SOFTWARE', 'ARQUITECTURA', 'ESTADISTICA DESCRIPTIVA', 'INGLES'];

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    this.studentName = await this.authService.getUsername() || 'Usuario Desconocido';
  }

  onSubmit() {
    const newRecord = {
      studentName: this.studentName,
      subject: this.subject,
      attendance: this.attendance
    };

    this.attendanceRecords.push(newRecord);

    this.clearFields();
  }

  clearFields() {
    this.studentName = '';
    this.subject = '';
    this.attendance = false;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
