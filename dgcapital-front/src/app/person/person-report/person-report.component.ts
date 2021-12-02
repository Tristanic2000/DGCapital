import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Months } from 'src/app/months';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-report',
  templateUrl: './person-report.component.html',
  styleUrls: ['./person-report.component.css']
})
export class PersonReportComponent implements OnInit {

  people: Person[];
   months: Months[];

  constructor(private personService: PersonService,
    private router: Router,) { }

  ngOnInit(): void {

    this.months = [
      {monthName: "January", monthValue:"01"},
      {monthName: "February", monthValue:"02"},
      {monthName: "March", monthValue:"03"},
      {monthName: "April", monthValue:"04"},
      {monthName: "May", monthValue:"05"},
      {monthName: "June", monthValue:"06"},
      {monthName: "July", monthValue:"07"},
      {monthName: "August", monthValue:"08"},
      {monthName: "September", monthValue:"09"},
      {monthName: "October", monthValue:"10"},
      {monthName: "November", monthValue:"11"},
      {monthName: "December", monthValue:"12"}
    ];

    this.personService.getPeople().subscribe(
      (people) => {

        console.log(people);
        this.people = people;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getBirthdays(month: string): number {
    if (this.people) {

      var i = 0;

      this.people.forEach(
        person => {
          if (person.birthdate.month == month) 
            i++;
        }
      )

      return i;
    }
    return 0;
  }

}
