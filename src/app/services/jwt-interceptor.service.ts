import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { catchError, from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(Auth.currentSession()).pipe(
      switchMap((auth: any) => {
        let jwt = auth.accessToken.jwtToken;
        let with_auth_request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        return next.handle(with_auth_request);
      }),
      catchError((error) => {
        // console.log("Error ",error);
        return next.handle(req);
      })
    );
  }
}
