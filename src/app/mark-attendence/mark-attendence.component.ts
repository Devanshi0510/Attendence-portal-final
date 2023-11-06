import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../Services/students.service';
import { Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-mark-attendence',
  templateUrl: './mark-attendence.component.html',
  styleUrls: ['./mark-attendence.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Change the locale if needed
    { provide: MAT_DATE_FORMATS, useValue: { display: { dateInput: 'DD/MM/YYYY' } } } // Set the format to DD/MM/YYYY
  ]
})
export class MarkAttendenceComponent {


  markStud: FormGroup;

  constructor(private http: HttpClient, private studentsService:StudentsService) {
    this.markStud = new FormGroup({
      id :new FormControl(''),
      date : new FormControl(''),
      status :new FormControl(''),
    })


  }

  MarkAttend(markStud:FormGroup){
    // const statusControl = this.markStud.get('status');
    // const dateControl = this.markStud.get('date');
    // const idControl = this.markStud.get('id');
    // const statusValue = statusControl?.value;
    // const dateValue = dateControl?.value;
    // const idValue = idControl?.value;
    // console.log('Selected Status:', statusValue);
    // console.log('Selected id', idValue);
    // console.log('Selected date:', dateValue);

    this.studentsService.MarkAttendence(markStud);
  }

}
