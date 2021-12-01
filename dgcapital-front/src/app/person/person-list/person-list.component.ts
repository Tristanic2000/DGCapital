import { analyzeNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { birthdate } from '../birthdate';
import { Person } from '../person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Person[];
  constructor() { }

  ngOnInit(): void {
    this.people = [{
      id: 1,
      name : "John",
      surname : "Stevens",
      birthdate : {day: "17", month: "01", year: "2011"}
    },{
      id: 2,
      name : "Peter",
      surname : "Dudeson",
      birthdate : {day: "25", month: "07", year: "1989"}
    },{
      id: 3,
      name : "Tristan",               //temp fake data
      surname : "Henderson",
      birthdate : {day: "03", month: "08", year: "2000"}
    },{
      id: 4,
      name : "Pierre",
      surname : "Putter",
      birthdate : {day: "10", month: "08", year: "2000"}
    },{
      id: 5,
      name : "Ruan",
      surname : "Dingo",
      birthdate : {day: "25", month: "07", year: "1989"}
    },{
      id: 6,
      name : "bish",
      surname : "bosh",
      birthdate : {day: "30", month: "12", year: "2019"}
    }]
  }

  getAge(birthdate: birthdate): number{

    if (birthdate){
      var currentDate = new Date();
      var currentDay = currentDate.getDay();
      var currentMonth = currentDate.getMonth();
      var currentYear = currentDate.getFullYear();

      var age = currentYear - Number.parseInt(birthdate.year);
      var month = currentMonth - Number.parseInt(birthdate.month);

      if (month < 0 || (month === 0 && currentDay < Number.parseInt(birthdate.day)))
        age--;
      return age;
    }
    return -1;
  }

  onEdit(id: number){

  }

  onDelete(id: number){
    
  }

}
