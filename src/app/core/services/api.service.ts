import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const url = 'https://gorest.co.in/public/v2/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token: string = environment.ilTuoToken;

  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string): Observable<T[]> {
    if (!this.token) {
      throw new Error('Token non disponibile');
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });

    return this.http.get<T[]>(`${url}${endpoint}`, { headers });
  }
}
