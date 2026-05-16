import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParfuemService {
  apiUrl = 'http://localhost:3000/parfuems';

  constructor(private http: HttpClient) { }

  getParfuems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}