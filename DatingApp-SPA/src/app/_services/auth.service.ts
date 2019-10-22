import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  // What we are passing over navbar: user=model
  login(model: any) {
    // console.log(this.baseUrl + 'login', model);
    const url: string = `${this.baseUrl}/login`;
    return this.http.post(url, model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );
   }

   register(model: any) {
     return this.http.post(this.baseUrl + '/register', model);
   }

   loggedIn() {
     // We get the token saved before in localstorage
     const token = localStorage.getItem('token');
     return !this.jwtHelper.isTokenExpired(token); // returns a boolean TRUE if its expired
   }
}
