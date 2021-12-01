import { InMemoryDbService } from "angular-in-memory-web-api";



export class FakePerson implements InMemoryDbService {

    createDb() {
        return [{
            id: 1,
            name: "John",
            surname: "Stevens",
            birthdate: { day: "17", month: "01", year: "2011" }
        }, {
            id: 2,
            name: "Peter",
            surname: "Dudeson",
            birthdate: { day: "25", month: "07", year: "1989" }
        }, {
            id: 3,
            name: "Tristan",               //temp fake data
            surname: "Henderson",
            birthdate: { day: "03", month: "08", year: "2000" }
        }, {
            id: 4,
            name: "Pierre",
            surname: "Putter",
            birthdate: { day: "10", month: "08", year: "2000" }
        }, {
            id: 5,
            name: "Ruan",
            surname: "Dingo",
            birthdate: { day: "25", month: "07", year: "1989" }
        }, {
            id: 6,
            name: "bish",
            surname: "bosh",
            birthdate: { day: "30", month: "12", year: "2019" }
        }]
    }
}