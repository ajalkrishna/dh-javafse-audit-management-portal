
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'types/user';
import { ApiService } from '../user/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  memberLoginForm: User = {
    username: '',
    password: ''
  }
  errorMessage: string;

  constructor(private route: Router, private api: ApiService) { }

  ngOnInit(): void {
  }

  loginCredentials() {
    this.api.authenticateUser(this.memberLoginForm).subscribe({
      next: (res) => {
        if (res.token == null) {
          setTimeout(() => {
            this.errorMessage = null;
          }, 1500);
          this.errorMessage = "*Invalid Credentials"
        }
        else {
          localStorage.setItem("token", res.token);
          this.route.navigateByUrl("user");
        }
      },
      error: () => {
        alert("something went wrong")
      }
    })
  }
}
