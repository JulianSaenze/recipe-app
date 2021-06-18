import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

//good practice to define the data you are working with
//Look up Endpoint / Request Body Payload / Response Payload at https://firebase.google.com/docs/reference/rest/auth#section-create-email-password for signing up
//... https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password for signing/login in
interface AuthResponseData {
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

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMB7UyYC1QDLXGCPaUEkp3YcWiyr9iR6g',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
        catchError(errorResponse => {
      let errorMessage = "An unknown error occurred!";
      if(!errorResponse.error || !errorResponse.error.error){
        return throwError(errorMessage);
      }
      //handling logic / errors not the best place to do in the component
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "This email exists already";
      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMB7UyYC1QDLXGCPaUEkp3YcWiyr9iR6g',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
  }

}
