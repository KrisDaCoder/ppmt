import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: this.authService.getTheAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/']);
            return of(err);
          }
          throw err;
        })
      );
  }
}
