import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from '../models/admin';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'https://localhost:44330/api/reservations';

  constructor(private http: HttpClient) { }

  // Create a new patient (using plain object)
  createNewPatient(patientData: any): Observable<any> {
    return this.http.post(this.apiUrl, patientData);
  }

  // Get all patients
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a patient by ID
  getPatientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update patient
  updatePatient(id: number, patientData: any): Observable<any> {
    // Create a FormData object
    const formData = new FormData();

    // Add each field to the FormData
    Object.keys(patientData).forEach(key => {
      // Handle date objects specially
      if (key === 'date' && patientData[key] instanceof Date) {
        formData.append(key, patientData[key].toISOString());
      } else {
        formData.append(key, patientData[key]);
      }
    });

    console.log('Sending FormData to API...');
    // Send the FormData instead of JSON
    return this.http.put(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(error => {
          console.error('HTTP error in updatePatient:', error);
          return throwError(() => error);
        })
      );
  }

  // Delete patient by ID
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
