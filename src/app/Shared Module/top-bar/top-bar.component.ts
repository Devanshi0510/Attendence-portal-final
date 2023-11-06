import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentsService } from 'src/app/Services/students.service';

@Component({

  
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent {

  searchText = '';

  constructor(private searchService: StudentsService) {}

  onSearch() {
    this.searchText=document.getElementsByTagName('input')[0].value;
    this.searchService.setSearchText(this.searchText);
  }

}
