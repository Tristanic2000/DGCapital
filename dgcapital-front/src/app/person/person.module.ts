import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonReportComponent } from './person-report/person-report.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonReportComponent,  
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: "person-list", component: PersonListComponent},
      { path: "person-report", component: PersonReportComponent},
      { path: "person/:id", component: PersonAddEditComponent}
   ])

  ]
})
export class PersonModule { }
