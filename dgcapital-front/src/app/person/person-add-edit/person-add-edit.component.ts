import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Months } from 'src/app/months';
import { Birthdate } from '../birthdate';
import { Person } from '../person';
import { PersonService } from '../person.service';



function noWhitespace(c: AbstractControl): {[key: string]: boolean } | null {

  const replacedControl = c.value.replace(" ", "");
  
  if (c.value.length !== replacedControl.length)
    return {"noWhitespace": true}

  return null;

}



@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.css']
})
export class PersonAddEditComponent implements OnInit {

  personForm: FormGroup;
  person: Person;
  pageTitle: string;
  private sub : Subscription;
  validationMessages: string = "";
  months : Months[];

  errorMessage: string="";
  errorFade: string="";

  serviceMessage: string= "";
  loadingTime: number;

  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) { }


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


    this.errorFade="";
    this.loadingTime = 0;

    this.sub = this.route.paramMap.subscribe(
      param => {

        const id = Number(param.get('id'));

        if (id === 0){

          this.serviceMessage = "";
          this.person = new Person(0, "", "", "", "", "");
          this.pageTitle = "Add Person"

          this.buildForm();
        }
        else{

          this.serviceMessage = "";
          this.pageTitle = "Edit Person";
          this.getPerson(id);
        }
      }
    )
  }


  getPerson(id: number) {
    
    this.serviceMessage = "Loading";

    const interval = setInterval(() => {
      this.loadingTime ++;
    }, 1000)

    this.personService.getPerson(id).subscribe(
      person => {
        this.serviceMessage = "Success";
        this.person = person;
        this.buildForm();
      },
      error => {

        this.serviceMessage = "Fail";
      }
    )
  }

  
  buildForm() {
    
    this.personForm = this.fb.group({
      name: [this.person.name, [Validators.required, Validators.minLength(2), noWhitespace]],
      surname: [this.person.surname, [Validators.required, Validators.minLength(2), noWhitespace]],
      day: [this.person.birthdateDay, [Validators.required]],
      month: [this.person.birthdateMonth, [Validators.required]],
      year: [this.person.birthdateYear, [Validators.required]]
    })
  }


  savePerson(){
    this.errorFade="";
    this.errorMessage="";

    if (!this.personForm.valid){

      this.errorMessage = "Please complete all data correctly on the form";

      this.validationMessages = "show"; //this is a property used for interpolation in html to know that the save button has been pressed
                                        // and that the controls that are invalid will show their respective error messages
      setTimeout(() => {
        this.errorFade="error-fade"  //this sets the error message div to have the ".error-fade class styling"
      },4000);

      setTimeout(() => {
        this.errorMessage = "";   //after fadeaway, the div element dissapears 
      },7000);
    }

    if (this.personForm.valid) {
      this.person.name = this.personForm.get("name")?.value;
      this.person.surname = this.personForm.get("surname")?.value;
      this.person.birthdateDay = this.personForm.get("day")?.value;
      this.person.birthdateMonth = this.personForm.get("month")?.value;
      this.person.birthdateYear = this.personForm.get("year")?.value;

      this.serviceMessage = "SaveLoading";
      this.loadingTime = 0;

      const interval = setInterval(() => {
        this.loadingTime++;
      }, 1000);

      this.personService.savePerson(this.person).subscribe(() => {

        this.serviceMessage = "SaveSucceess";
        this.buildForm();
        this.router.navigate(['/person-list']);

      }
        , err => {

          clearInterval(interval);
          this.serviceMessage = "SaveFail"
        });
    }
  }

  clearServiceMessage(){
    this.serviceMessage = "";
    this.loadingTime = 0;
  }

  counterDays(i: number) {
    return new Array(i);
  }

  counterYears(): number[]{

    var i = 1900;
    var arr = new Array(new Date().getFullYear() - i);
    var counter = 0;

    while(i < new Date().getFullYear()){
      arr[counter] = i;
      counter++; i++;
    }

    return arr;
  }
}
