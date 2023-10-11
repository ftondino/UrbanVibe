import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'https://gorest.co.in/public/v2/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string): Observable<T[]> {
    if (!this.token) {
      throw new Error('Token non disponibile');
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });

    return this.http.get<T[]>(`${url}${endpoint}`, { headers });
  }
}
