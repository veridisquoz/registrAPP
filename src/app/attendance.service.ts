import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, CollectionReference } from '@angular/fire/firestore';
import IAttendance from 'src/app/interfaces/attendances.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.attendanceCollection = collection(this.firestore, 'attendance');
  }

  // Método para registrar la asistencia en Firestore
  async registrarAttendance(attendanceData: IAttendance): Promise<void> {
    try {
      await addDoc(this.attendanceCollection, attendanceData);
      console.log('Asistencia registrada correctamente');
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      throw error;
    }
  }

  // Método para obtener los registros de asistencia de un usuario desde Firestore
  async obtenerAttendanceRecords(username: string): Promise<IAttendance[]> {
    const q = query(this.attendanceCollection, where('username', '==', username));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as IAttendance);
  }
}
