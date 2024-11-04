import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  attendanceRecords: any[] = [];
  groupedAttendanceRecords: any[] = [];
  errorMessage: string = '';

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    const username = await this.authService.getUsername();
    console.log('Nombre de usuario obtenido:', username); // Verifica el valor aquí
    if (username) {
      this.loadAttendance(username);
    } else {
      this.errorMessage = 'Error: No se pudo obtener el nombre de usuario.';
    }
  }
  

  loadAttendance(username: string) {
    this.attendanceService.getAttendanceRecords(username).subscribe(
      (data) => {
        console.log('Datos de asistencia:', data); // Verificar los datos aquí
        this.attendanceRecords = data;
        this.groupAttendanceBySubject();
      },
      (error) => {
        console.error('Error al cargar registros de asistencia', error);
        this.errorMessage = 'Error al cargar registros de asistencia';
      }
    );
  }  

  groupAttendanceBySubject() {
    const grouped = this.attendanceRecords.reduce((acc, record) => {
      const subject = record.subject;
      if (!acc[subject]) {
        acc[subject] = { subject, records: [] };
      }
      acc[subject].records.push(record);
      return acc;
    }, {});

    this.groupedAttendanceRecords = Object.values(grouped);
  }

  // Método para volver al home
  goToHome() {
    this.router.navigate(['/home']);
  }
}
