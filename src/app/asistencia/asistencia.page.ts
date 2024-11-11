import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import IAttendance from 'src/app/interfaces/attendances.interfaces';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  attendanceRecords: IAttendance[] = [];
  groupedAttendanceRecords: any[] = [];
  errorMessage: string = '';

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const username = await this.authService.getUsername();
    console.log('Nombre de usuario obtenido:', username);
    if (username) {
      this.loadAttendance(username);
    } else {
      this.errorMessage = 'Error: No se pudo obtener el nombre de usuario.';
    }
  }

  async loadAttendance(username: string) {
    try {
      const data = await this.attendanceService.obtenerAttendanceRecords(username);
      console.log('Datos de asistencia:', data);
      this.attendanceRecords = data;
      this.groupAttendanceBySubject();
    } catch (error) {
      console.error('Error al cargar registros de asistencia', error);
      this.errorMessage = 'Error al cargar registros de asistencia';
    }
  }

  groupAttendanceBySubject() {
    const grouped = this.attendanceRecords.reduce((acc, record) => {
      const subject = record.subject;
      if (!acc[subject]) {
        acc[subject] = { subject, records: [] };
      }
      acc[subject].records.push(record);
      return acc;
    }, {} as { [key: string]: { subject: string; records: IAttendance[] } });

    this.groupedAttendanceRecords = Object.values(grouped);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
