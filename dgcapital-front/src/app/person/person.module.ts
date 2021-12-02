import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonReportComponent } from './person-report/person-report.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { PersonService } from './person.service';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonReportComponent,  
    PersonAddEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "person-list", component: PersonListComponent},
      { path: "person-report", component: PersonReportComponent},
      { path: "person/:id", component: PersonAddEditComponent}
   ]),
  ],
  providers: [
    PersonService
  ]
})
export class PersonModule { }
