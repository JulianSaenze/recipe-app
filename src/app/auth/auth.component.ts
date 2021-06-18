import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    //extra check - user can hack and enable button
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {
      //logging in
      // ...
    } else {
      //signing up
      //subscribe to the response value of signUp
      this.authService.signUp(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = "An error occurred";
        console.log(error);
      }
      );
    }

    form.reset();
  }
}
