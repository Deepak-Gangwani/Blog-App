import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  author = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    about: '',
  }

  image: any;

  select(e: any) {
    this.image = e.target.files[0];
  }

  constructor(private _auth: AuthService, private router: Router){}


  ngOnInit(): void {

  }

  register() {

    let fd=new FormData()
    fd.append('name',this.author.name)
    fd.append('lastname',this.author.lastname)
    fd.append('email',this.author.email)
    fd.append('password',this.author.password)
    fd.append('about',this.author.about)
    fd.append('image',this.image)

    this._auth.register(fd)
      .subscribe(
        res=>{
          this.router.navigate(['/login']);
        }
      );
  }

}
