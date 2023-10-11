import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();
  token: string = '';
  user: any = {};

  private apiUrl = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  setUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = localStorage.getItem('token');
    if (user && token) {
      this.user = user;
      this.token = token;
    }
  }

  newUser(user: any, token: string): Observable<any> {
    if (!token) {
      throw new Error('Token non disponibile');
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(this.apiUrl, user, { headers });
  }

  deleteUser(user: any): Observable<any> {
    if (!this.token) {
      throw new Error('Token non disponibile');
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });

    return this.http.delete(`${this.apiUrl}/${user}`, { headers });
  }
}
