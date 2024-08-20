import { Reservation } from './../models/reservation';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl = 'https://localhost:44330/api/reservations';

  constructor(private http: HttpClient) { }

  createNewReservation = (formData: Reservation) => this.http.post(this.apiUrl, formData);
}
