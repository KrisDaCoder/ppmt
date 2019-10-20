import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  errors: any;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.cleanErrorObject();
  }

  ngOnInit() {
    this.loginUserForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    this.authService.logout();
  }

  onSubmit() {
    this.authService.loginUser(this.loginUserForm.value).subscribe(data => {
      this.cleanErrorObject();
      this.loginUserForm.reset();
      this.authService.login(data);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.cleanErrorObject();
      this.assignErrors(error.error);
    });
  }

  assignErrors(error: any) {
    if (error.username) {
      this.errors.username = error.username;
    }

    if (error.password) {
      this.errors.password = error.password;
    }
  }

  cleanErrorObject() {
    this.errors =  {
      fullName: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

}
