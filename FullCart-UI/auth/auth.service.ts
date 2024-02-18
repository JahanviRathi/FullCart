import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'shared/models/User';
import { UserLoginRequest } from 'shared/models/UserLoginRequest';
import { UserRegisterRequest } from 'shared/models/UserRegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApiUrl: string = 'https://localhost:7118/api/Auth';
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(request: UserRegisterRequest): Observable<any> {
    return this.httpClient.post<any>(this.authApiUrl + '/register', request);
  }

  login(request: UserLoginRequest): Observable<string> {
    return this.httpClient.post(this.authApiUrl + '/login', request, {
      responseType: 'text',
    });
  }

  getCurrentUser(email: string): Observable<User> {
    return this.httpClient.get<User>(this.authApiUrl + '/user/' + email).pipe(
      tap((user: User) => {
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role == 'Admin') localStorage.setItem('admin', '1');
        else localStorage.setItem('admin', '0');
      })
    );
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('authToken');
  }

  autoLogin(): void {
    const userData: User = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }
    this.user.next(userData);
  }
}
