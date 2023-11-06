import { Injectable } from '@angular/core';
import { AfterViewInit, Component, ViewChild, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from '../model/students';
import { attendance } from '../model/attendance';
import { map } from 'rxjs/operators';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StudentsService implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'action'];
  dataSource = new MatTableDataSource<Students>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  allStudents: Students[] = [];

  allStudents$ = new BehaviorSubject<Students[]>([]);
  student: Students;
  private searchText = new BehaviorSubject<string>('');

  setSearchText(text: string) {
    console.log(text);
    this.searchText.next(text);
  }

  getSearchText() {
    return this.searchText.asObservable();
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchProducts();
  }

  getStudents() {
    return this.http.get<Students[]>(
      'https://6538f4a8a543859d1bb24431.mockapi.io/student'
    );
  }

  AddStudentDetail(addStud: FormGroup) {
    console.log(addStud.value);
    this.http
      .post(
        'https://6538f4a8a543859d1bb24431.mockapi.io/student',
        addStud.getRawValue()
      )
      .subscribe((res) => {
        console.log(res);
      });
    alert('User Registered');
  }

  fetchProducts() {
    this.http
      .get('https://6538f4a8a543859d1bb24431.mockapi.io/student')
      .pipe(
        map((res) => {
          const students = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              students.push({ ...res[key], id: res[key].id || key });
            }
          }
          return students;
        })
      )
      .subscribe((students) => {
        // console.log(students);
        // console.log(students);
        this.allStudents = students;
        this.allStudents$.next(students);
        this.dataSource.data = students;
      });
  }

  DeleteStudent(id: string) {
    console.log(id);

    if (confirm('Are you sure you want to delete this record?')) {
      this.http
        .delete('https://6538f4a8a543859d1bb24431.mockapi.io/student/' + id)
        .subscribe(
          () => {
            this.allStudents = this.allStudents.filter(
              (student) => student.id !== id
            );
            this.allStudents$.next(this.allStudents);
            this.dataSource.data = this.allStudents;
          },
          (err) => {
            console.log('Error:', err);
          }
        );
    }
  }

  EditStudentDetail(addStud: FormGroup, prodId: number) {
    // console.log(addStud.value);
    // console.log('hey');
    // console.log(this.allStudents);
    const student = this.allStudents.find((s) => s.id === prodId.toString());
    console.log(student);
    if (!student) {
      throw new Error(`Student with id ${addStud.value.id} not found`);
    }

    const url = `https://6538f4a8a543859d1bb24431.mockapi.io/student/${student.id}`;
    console.log(url);
    this.http.put<Students>(url, addStud.value).subscribe((updatedStudent) => {
      const index = this.allStudents.indexOf(student);
      this.allStudents.splice(index, 1, updatedStudent);
      this.dataSource.data = this.allStudents;
    });
  }

  MarkAttendence(markStud: FormGroup) {
    const statusControl = markStud.get('status');
    const dateControl = markStud.get('date');
    const idControl = markStud.get('id');

    const statusValue = statusControl?.value;
    const dateValue = dateControl?.value;
    const idValue = idControl?.value;

    const date = new Date(dateValue);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const x = `${day}/${monthIndex + 1}/${year}`;

    const studentToUpdate = this.allStudents$.value.find(
      (s) => s.id === idValue.toString()
    );
    if (studentToUpdate) {
      studentToUpdate.attendance.push({ date: x, status: statusValue });
      this.http
        .put(
          `https://6538f4a8a543859d1bb24431.mockapi.io/student/${idValue}`,
          studentToUpdate
        )
        .subscribe(
          (result) => {
            console.log('Student resource updated:', result);
            alert('Attendence Updated');
          },
          (error) => {
            console.error('Error updating student resource:', error);
          }
        );
    } else {
      alert('Student not Registered');
    }
  }
}
