import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoverPageComponent } from './cover-page/cover-page.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ChartsComponent } from './charts/charts.component';
import { MarkAttendenceComponent } from './mark-attendence/mark-attendence.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DisplayAttendenceComponent } from './display-attendence/display-attendence.component';


 const routes: Routes = [

    {
      path:"",
      component: DashboardComponent
    },
    {
      path:"cover-page",
      component: CoverPageComponent
    }
    ,
    {
      path:"add-student",
      component: AddStudentComponent
    }
    ,
    {
      path:"mark-attendence",
      component: MarkAttendenceComponent
    },
    {
      path:"charts",
      component: ChartsComponent
    },
    {
      path:"edit-student/:studentId",
      component: EditStudentComponent
    },
    {
      path:"display-attendence/:id",
      component: DisplayAttendenceComponent
    },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
