import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword: boolean = true; // Variable to toggle password visibility

  author = {
    email: '',
    password: '',
  }

  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]]
    });

  }

  token: any;

  // userlogin() {
  //   if (this.loginForm.valid) {
  //     this._auth.login(this.loginForm.value){
  //       .subscribe(
  //         res => {
  //           localStorage.setItem('token', res.mytoken);
  //           this.router.navigate(['/home']);
  //         },
  //         err => {
  //           console.log(err);
  //         }
  //       );
  //     }
  //   }
  // }    


  userlogin() {
    this._auth.login(this.author)
      .subscribe(
        res => {
          this.token = res;
          // {mytoken:'random code'}
          localStorage.setItem('token', this.token.mytoken);
          let storedToken = localStorage.getItem('token');
          console.log(storedToken)
          if (storedToken == "undefined") {
            console.warn('User does not have a valid JWT token.');
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            // Optionally display a message to the user (e.g., using a toast notification)
          } else {
            this.router.navigate(['/home']);
          }

        },
        err => {
          console.log(err)
        }
      );


  }


}
