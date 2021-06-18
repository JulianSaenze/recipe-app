import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//good practice to define the data you are working with
//Look up Endpoint / Request Body Payload / Response Payload at https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
    );
  }

}
