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
  months: Months;

  constructor(private personService: PersonService,
    private router: Router,) { }

  ngOnInit(): void {

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

  getBirthdays(month: number): number {
    if (this.people) {

      var i = 0;

      this.people.forEach(
        person => {
          if (person.birthdate.month == month.toString()) 
            i++;
        }
      )

      return i;
    }
    return 0;
  }

}
