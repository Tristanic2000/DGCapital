import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { catchError, delay, tap } from 'rxjs/operators';
import { Person } from './person';

@Injectable()
export class PersonService {

  private APIurl = "http://localhost:18724/api/person"
  private people: Person[];


  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {

    if (this.people){
      return of (this.people);
    }
    return this.http.get<Person[]>(this.APIurl)
                    .pipe(
                        // delay(2000),
                        tap(data => console.log(JSON.stringify(data))),
                        catchError(this.errorHandler)
                    );
  }


  getPerson(id: number): Observable<Person> {

    const url = `${this.APIurl}/${id}`;
    return this.http.get<Person>(url)
                    .pipe(
                        // delay(2000),
                        tap(data => console.log('Data: ' + JSON.stringify(data))),
                        catchError(this.errorHandler)
                    );
  }


  savePerson(Person: Person): Observable<Person> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (Person.id === 0) {      
      return this.createPerson(Person, headers)
    }
    return this.updatePerson(Person, headers);
  }


  private createPerson(Person: Person, headers: HttpHeaders): Observable<Person> {

    const url = `${this.APIurl}/create`;

      return this.http.post<Person>(url, Person,  { headers: headers} )
                      .pipe(
                          // delay(2000),
                          tap(data => console.log('createPerson: ' + JSON.stringify(data))),
                          catchError(this.errorHandler)
                      );
  }


  private updatePerson(Person: Person, headers: HttpHeaders): Observable<Person> {

      const url = `${this.APIurl}/update`;
      return this.http.put<Person>(url, Person, { headers: headers} )
                      .pipe(
                          // delay(2000),
                          tap(data => console.log('updatePerson: ' + Person.id)),
                          catchError(this.errorHandler)
                      );
  }

  deletePerson(id: number): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.APIurl}/delete/${id}`;

    
    return this.http.delete<Person>(url, { headers: headers} )
                    .pipe(
                        // delay(2000),
                        tap(data => console.log('deletePerson: ' + id)),
                        catchError(this.errorHandler)
                    );
}
  
  errorHandler(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof Error) {

        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${error.error.message}`;

    } else {

        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }

    console.error(errorMessage);
    
    return throwError(error);
  }


}
