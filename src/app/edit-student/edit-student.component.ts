import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../Services/students.service';
import { ActivatedRoute } from '@angular/router';

interface addStud {
  id:string;
  email: string;
  name: string;
  phone: number;
}

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent {

  prodId:number;
  addStud: FormGroup;

  constructor(private http: HttpClient, private studentsService:StudentsService,private activeRoute: ActivatedRoute,) {
    this.addStud = new FormGroup({
      id: new FormControl(''),
      email :new FormControl(''),
      phone : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{11}")]),
      name :new FormControl(''),
    })
    this.prodId = this.activeRoute.snapshot.params['studentId'];
    console.log(this.prodId)
    this.addStud.get('id').setValue(this.prodId);
    console.log(this.addStud.value.id)
}

EditStudentDetail(addStud:FormGroup,prodId:number)
{
console.log(this.addStud.value)
this.studentsService.EditStudentDetail(addStud,this.prodId);
}
}