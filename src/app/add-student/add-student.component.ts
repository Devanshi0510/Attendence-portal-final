import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../Services/students.service';
import { Students } from '../model/students';
interface addStud {
  email: string;
  name: string;
  phone: number;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {

  addStud: FormGroup;

  constructor(private http: HttpClient, private studentsService:StudentsService) {
    this.addStud = new FormGroup({
      email :new FormControl(''),
      phone : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{11}")]),
      name :new FormControl(''),
    })


  }


  AddStudentDetail(addStud:FormGroup) {
    this.studentsService.AddStudentDetail(addStud)
    // console.log(this.addStud.value);
    // this.http.post( "https://6538f4a8a543859d1bb24431.mockapi.io/student",this.addStud.getRawValue())
    // .subscribe((res)=>{console.log(res);});
  }





}
