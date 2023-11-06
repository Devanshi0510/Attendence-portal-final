import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-attendence',
  templateUrl: './display-attendence.component.html',
  styleUrls: ['./display-attendence.component.scss']
})
export class DisplayAttendenceComponent  implements OnInit { attendanceList: any[]; allStudents: any[];
  student: any;
  displayedColumns =['date','status']
 constructor(private route: ActivatedRoute, private http: HttpClient) { }

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://6538f4a8a543859d1bb24431.mockapi.io/student/${id}`)
      .subscribe(data => {
        this.student = data;
        console.log(this.student)
        console.log(this.student.attendance.length)
      });
 }}