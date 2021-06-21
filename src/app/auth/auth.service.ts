import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

//good practice to define the data you are working with
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  //optional value for login in with post -> returns same object with registered property
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  //emit new user whenever a user logs in or logs out
  //BehaviorSubject behaves like a Subject - call next to emit a value and subscribe to it go get informed about new values
  //Difference is that BehaviorSubject gives access to the previous emitted Subject
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router) {}
  //Look up Endpoint / Request Body Payload / Response Payload at https://firebase.google.com/docs/reference/rest/auth#section-create-email-password for signing up

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMB7UyYC1QDLXGCPaUEkp3YcWiyr9iR6g',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(
        catchError(this.handleError));
  }

  //...for signing/login in
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMB7UyYC1QDLXGCPaUEkp3YcWiyr9iR6g',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn)
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

      if(loadedUser.token) {
        this.user.next(loadedUser);
      }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //expiresIn holds a string of a number in seconds when the ID token expires / * 1000 convert into ms / new Date at the beginning converts it into time stamp (no ms)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(
        email,
        userId,
        token,
        expirationDate
      );
      //emit this as the now logged in user
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse){

      let errorMessage = "An unknown error occurred!";
      if(!errorResponse.error || !errorResponse.error.error){
        return throwError(errorMessage);
      }
      //handling logic / errors not the best place to do in the component
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "This email exists already";
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = "This e-mail does not exist";
          break;
        case 'INVALID_PASSWORD':
          errorMessage = "This password is not correct";
          break;
      }
      return throwError(errorMessage);
  }

}
