import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
