import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para registrar la asistencia
  registerAttendance(attendanceData: any) {
    return this.http.post(`${this.apiUrl}/attendance`, attendanceData);
  }

  // Método para obtener los registros de asistencia de un usuario
  getAttendanceRecords(username: string) {
    return this.http.get<any[]>(`${this.apiUrl}/attendance/${username}`);
  }
}
