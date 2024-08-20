import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ReservationService } from './service/reservation.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, FormsModule, CalendarModule, DropdownModule, ReactiveFormsModule, ToastModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservationForm: FormGroup;
  disabledDates: Date[] = [];
  disabledDays: number[] = [];
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private reservationService: ReservationService
  ) {
    // Inicijalno vrijeme postavljeno na 09:00
    const initialDate = new Date();
    initialDate.setHours(9, 0, 0, 0); // Postavlja sat na 9:00 i resetira sekunde i milisekunde

    this.reservationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      service: ['', Validators.required],
      date: [initialDate, Validators.required],  // Postavljanje početnog vremena na 09:00
      note: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.disabledDates = [
      new Date('2024-12-25'),  
      new Date('2024-01-01')   
    ];

    this.disabledDays = [0, 6]; 

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 3); 
  }

  onPhoneCodeChange(): void {
    const phoneCode = this.reservationForm.get('phoneCode')?.value || '';
    let phone = this.reservationForm.get('phone')?.value || '';

    if (!phone.startsWith(phoneCode)) {
      phone = phoneCode + phone.replace(/^\+\d+/, '');
      this.reservationForm.get('phone')?.setValue(phone);
    }
  }

  onDateSelect(event: any): void {
    const selectedDate: Date = event;
    const selectedHour = selectedDate.getHours();
    const selectedMinute = selectedDate.getMinutes();

    if (selectedHour < 9 || selectedHour > 16 || selectedMinute % 5 !== 0) {
      this.reservationForm.get('date')?.setErrors({ 'invalidTime': true });
    }
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      return;
    }

    this.reservationService.createNewReservation(this.reservationForm.value).subscribe((response) => {
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Uspjeh!', detail: 'Vaša rezervacija za termin je zaprimljena' });
      this.reservationForm.reset();
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Greška!', detail: 'Došlo je do pogreške, pokušajte ponovno kasnije' });
      this.reservationForm.reset();
    });
  }
}
