import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  private url = 'http://127.0.0.1:3000/author/';

  register(author: any) {
    return this.http.post(this.url + 'register', author);
  }

  // login(author: any) {
  //   return this.http.post(this.url + 'login', author);
  // }

  // login(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post<any>(this.url+'login', credentials);
  // }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.url + 'login', credentials)
      .pipe(
        catchError(error => {
          if (error.status === 401 && error.error === 'Email not registered') {
            // Email not registered in the database
            return throwError('Email not registered');
          } else {
            // Other errors
            return throwError('An error occurred');
          }
        })
      );
  }

  isLoggedIn() {

    let token = localStorage.getItem('token');
    if(token) {
      return true;
    }else {
      return false;
    }
  }

  getAuthorDataFromToken() {
    let token = localStorage.getItem('token');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]))
      return data;
    }
  }

  getById(id: any){
    return this.http.get(this.url+'getbyid/'+id);
  }

}
