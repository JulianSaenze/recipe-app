import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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

  constructor(private http: HttpClient) {}
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

  //... https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password for signing/login in
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMB7UyYC1QDLXGCPaUEkp3YcWiyr9iR6g',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
      catchError(this.handleError));
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
