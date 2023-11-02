import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmUxNTk3MzRlZmVjY2U5MTM4N2QyY2VjMTI4ZGY5YSIsInN1YiI6IjY1NDJjZGIwYjA5YmRlMDExZjdjNjc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._A7AkjY6GJfPEeC5Bqk3eL54f1nLxrcCPJLl_3FU2iM',
      },
    });
    return next.handle(request);
  }
}
