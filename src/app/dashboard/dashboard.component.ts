import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from '../model/students';
import { map } from 'rxjs/operators';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from '../Services/students.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'action'];
  dataSource = new MatTableDataSource<Students>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allStudents: Students[] = [];

  searchText = '';

  constructor(
    private http: HttpClient,
    private studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.studentsService.allStudents$.subscribe((students) => {
      this.dataSource.data = students;
      this.allStudents = students;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });

    this.studentsService.getSearchText().subscribe((searchText) => {
      this.searchText = searchText;
      this.applyFilter(searchText);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchProducts();
  }

  fetchProducts() {
    this.studentsService.fetchProducts();
  }

  DeleteStudent(id: string) {
    this.studentsService.DeleteStudent(id);
    // console.log(id)
    // if(confirm("Are you sure you want to delete this record?"))
    // this.http.delete("https://6538f4a8a543859d1bb24431.mockapi.io/student/" + id).subscribe(() => {
    //   this.allStudents = this.allStudents.filter(student => student.id !== id);
    //   this.dataSource.data = this.allStudents;
    // },err=>{ console.log('Error:', err);});
  }
}
