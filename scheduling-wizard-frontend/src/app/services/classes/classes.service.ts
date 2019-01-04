import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Classes } from './classes';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  private readonly API_BASE = 'http://localhost:3000';//'http://ec2-34-211-254-28.us-west-2.compute.amazonaws.com:3001';
  private readonly CLASSES_URL = 'assets/classes.json';//`${this.API_BASE}/classes/all`;  // URL to classes
  
  getClasses(): Observable<Classes[]> {
    console.log('get classes');
    this.messageService.add('ClassesService: fetched classes');
    return this.http.get<Classes[]>(this.CLASSES_URL).pipe(tap(_ => this.log('fetched classes')),
      catchError(this.handleError('getClasses', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ClassesService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
