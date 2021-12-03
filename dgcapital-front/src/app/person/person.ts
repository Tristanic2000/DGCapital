import { Birthdate } from "./birthdate";

export class Person {

    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public birthdateDay: string,
        public birthdateMonth: string,
        public birthdateYear: string){
    }
}