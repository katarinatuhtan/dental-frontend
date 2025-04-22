import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AdminService } from './service/admin.service';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule, FormsModule, DialogModule, InputTextModule, ReactiveFormsModule, CalendarModule],
  providers: [MessageService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  patients: any[] = [];
  searchQuery: string = '';
  filteredPatients: any[] = [];
  selectedPatientId: number | null = null;
  selectedPatient!: any;
  patientForm: FormGroup;
  displayDialog: boolean = false;
  selectedFile!: File | null;
  disabledDates: Date[] = [];
  disabledDays: number[] = [];
  minDate: Date;
  maxDate: Date;




  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private authService: AuthService, 
    private router: Router) {
    const initialDate = new Date();
    initialDate.setHours(9, 0, 0, 0);

    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      service: ['', Validators.required],
      date: [initialDate, Validators.required],
      note: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.disabledDates = [
      new Date('2025-12-25'),
      new Date('2025-01-01')
    ];

    this.disabledDays = [0, 6];

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }

  ngOnInit(): void {
    this.loadAllPatients();
  }

  loadAllPatients(): void {
    this.adminService.getAllPatients().subscribe(
      (data) => {
        this.patients = data;
        this.filteredPatients = [...this.patients]; // Initialize filteredPatients with all patients
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Pogreška', detail: 'Pogreška prilikom učitavanja pacijenata.'
        });
      }
    );
  }

  showCreateDialog(): void {
    this.patientForm.reset();
    this.selectedPatient = null;
    this.displayDialog = true;
  }
  filterPatients(): void {
    const query = this.searchQuery?.toLowerCase().trim() || '';

    if (!query) {
      this.filteredPatients = [...this.patients];
      return;
    }

    this.filteredPatients = this.patients.filter(patient => {
      const firstName = (patient.firstName || '').toLowerCase();
      return firstName.includes(query);
    });
  }

  onSubmit(): void {
  if (this.patientForm.invalid) {
    this.messageService.add({ severity: 'warning', summary: 'Pogreška', detail: 'Sva polja su obavezna.' });
    return;
  }

  const patientData = { ...this.patientForm.value }; // Get the form data

  // If there's an existing patient ID, update the patient
  if (this.selectedPatientId) {
    // Include the ID in the patient data for the update
    patientData.id = this.selectedPatientId;  // Add the ID to the data for the update

    this.adminService.updatePatient(this.selectedPatientId, patientData).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Uspjeh!', 
          detail: 'Podaci pacijenta su ažurirani.' 
        });
        this.loadAllPatients(); // Reload the patient list after update
        this.patientForm.reset();
        this.displayDialog = false; // Close the dialog
      }, 
      (error) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Greška', 
          detail: 'Došlo je do pogreške prilikom ažuriranja.' 
        });
        this.patientForm.reset();
      }
    );
  } else {
    // If there's no existing patient, create a new patient
    this.adminService.createNewPatient(patientData).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Uspjeh!', 
          detail: 'Vaša rezervacija za termin je zaprimljena' 
        });
        this.loadAllPatients(); // Reload the patient list after creating new
        this.patientForm.reset();
        this.displayDialog = false; // Close the dialog
    
      }, 
      (error) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Greška!', 
          detail: 'Došlo je do pogreške, pokušajte ponovno kasnije' 
        });
        this.patientForm.reset();
      }
    );
  }
}


onEditPatient(patient: any): void {
  this.selectedPatient = patient;

  this.selectedPatientId = null;  // ✅ Set ID properly
  this.selectedPatient = patient;       // ✅ Store full object if needed

  const dateControl = this.patientForm.get('date');
  dateControl?.enable();

  this.patientForm.patchValue({
    firstName: patient.firstName || '',
    lastName: patient.lastName || '',
    service: patient.service || '',
    date: patient.date ? new Date(patient.date) : new Date(),
    note: patient.note || '',
    email: patient.email || '',
    phoneCode: patient.phoneCode || '',
    phone: patient.phone || ''
  });

  this.displayDialog = true;

  this.messageService.add({
    severity: 'info',
    summary: 'Uređivanje',
    detail: `Uređivanje pacijenta: ${patient.firstName}`
  });
}


  onDeletePatient(id: number): void {
    if (confirm('Jeste sigurni da želite obrisati pacijenta?')) {
      this.adminService.deletePatient(id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Obrisano', detail: 'Pacijent je uspješno obrisan.'
          });
          this.loadAllPatients();  // Reload recipes after deletion
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Pogreška', detail: 'Pogreška pri brisanju podataka o pacijentu.'
          });
        }
      );
    }
  }

  onPhoneCodeChange(): void {
    const phoneCode = this.patientForm.get('phoneCode')?.value || '';
    let phone = this.patientForm.get('phone')?.value || '';

    if (!phone.startsWith(phoneCode)) {
      phone = phoneCode + phone.replace(/^\+\d+/, '');
      this.patientForm.get('phone')?.setValue(phone);
    }
  }
  onDateSelect(event: any): void {
    const selectedDate: Date = event;
    const selectedHour = selectedDate.getHours();
    const selectedMinute = selectedDate.getMinutes();

    if (selectedHour < 9 || selectedHour > 16 || selectedMinute % 5 !== 0) {
      this.patientForm.get('date')?.setErrors({ 'invalidTime': true });
    }
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);

}
}
