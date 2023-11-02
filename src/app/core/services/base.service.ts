import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface RequestOptions {
  headers: HttpHeaders;
  params?: HttpParams;
}
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  httpOptions: any = {
    headers: new HttpHeaders(),
  };
  constructor(public readonly http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type',
      'application/json; charset=utf-8',
      'Access-Control-Allow-Origin: *'
    );
  }

  get<T>(path: string, params?: Record<string, string>): Observable<T> {
    const option: RequestOptions = {
      headers: this.httpOptions.headers,
    };
    if (params) {
      let localParams = new HttpParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null) {
          localParams = localParams.append(key, value);
        }
      });
      option.params = localParams;
    }
    return this.http.get<T>(`${environment.apiUrl}${path}`, option);
  }
}
