import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatesResult } from '../models/states.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private httpClient: HttpClient) {}

  getResults(): Observable<StatesResult[]> {
    return this.httpClient.get<StatesResult[]>('assets/data/states-results.json');
  }

  getNationalResults(): Observable<StatesResult[]> {
    return this.httpClient.get<StatesResult[]>('assets/data/national-results.json');
  }
}
