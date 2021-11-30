import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonReportComponent } from './person-report/person-report.component';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PersonModule { }
