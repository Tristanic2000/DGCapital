import { analyzeNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Birthdate } from '../birthdate';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Person[];

  serviceMessage: string = "";
  loadingTime : number;

  constructor(private personService: PersonService,
              private router: Router,) { }

  ngOnInit(): void {

    this.serviceMessage = "Loading";
    this.loadingTime = 0;

    const interval = setInterval(() => {
      this.loadingTime ++;
    }, 1000);

    this.personService.getPeople().subscribe(
      (people) => {

        clearInterval(interval);
        this.serviceMessage = "Success";
        console.log(people);
        this.people = people;
      },
      (error) => {

        clearInterval(interval);
        this.serviceMessage = "Fail";
        console.log(error);
      }
    )
  }

  getAge(person: Person): number{

    if (person){
      var currentDate = new Date();
      var currentDay = currentDate.getDay();
      var currentMonth = currentDate.getMonth();
      var currentYear = currentDate.getFullYear();

      var age = currentYear - Number.parseInt(person.birthdateYear);
      var month = currentMonth - Number.parseInt(person.birthdateMonth);

      if (month < 0 || (month === 0 && currentDay < Number.parseInt(person.birthdateDay)))
        age--;
      return age;
    }
    return -1;
  }

  onEdit(person: Person){

    if (person != undefined)
      this.router.navigate(['person', person.id])
  }

  onDelete(person: Person) {

    if (confirm("Are you sure you wish to delete " + person.name + "?")) {

      this.serviceMessage = "DeleteLoading";
      this.loadingTime = 0;

      const interval = setInterval(() => {
        this.loadingTime++;
      }, 1000);

      this.personService.deletePerson(person.id).subscribe(
        (people) => {

          clearInterval(interval);
          this.serviceMessage = "DeleteSuccess";
          console.log(`Deleted: ${people}`);

          const index = this.people.indexOf(person, 0);
          if (index > -1) {
            this.people.splice(index, 1);
          }
        },
        (error) => {

          clearInterval(interval);
          this.serviceMessage = "DeleteFail";
          console.log(error);
        }
      )
    }
  }

  clearServiceMessage(){
    this.loadingTime = 0;
    this.serviceMessage = "";
  }
}
