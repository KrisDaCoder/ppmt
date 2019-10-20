import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserForm: FormGroup;
  errors: any;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.cleanErrorObject();
  }

  ngOnInit() {
    this.registerUserForm = new FormGroup({
      fullName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
    this.authService.logout();
  }

  onSubmit() {
    this.authService.registerUser(this.registerUserForm.value).subscribe(data => {
      this.cleanErrorObject();
      this.registerUserForm.reset();
      this.router.navigate(['/']);
    }, error => {
      this.cleanErrorObject();
      this.assignErrors(error.error);
    });
  }

  cleanErrorObject() {
    this.errors =  {
      fullName: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  assignErrors(error: any) {
    if (error.fullName) {
      this.errors.fullName = error.fullName;
    }

    if (error.username) {
      this.errors.username = error.username;
    }

    if (error.password) {
      this.errors.password = error.password;
    }

    if (error.confirmPassword) {
      this.errors.confirmPassword = error.confirmPassword;
    }
  }

}
