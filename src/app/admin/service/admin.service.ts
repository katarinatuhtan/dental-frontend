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

  createNewPatient = (formData: Admin) => this.http.post(this.apiUrl, formData);
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Get all patients
  }
   // Fetch a patient by ID
   getPatientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Delete a patient by ID
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePatient(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
  
}
