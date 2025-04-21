import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from '../models/admin';

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

// Update a patient
updatePatient(id: number, patientData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, patientData);
}

// Delete a patient by ID
deletePatient(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
  
}
