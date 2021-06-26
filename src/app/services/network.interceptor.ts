import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("intercepting")
    setTimeout(() => this.apiService.loading(true), 0);
    return next.handle(request).pipe(
      finalize(() => {
        this.apiService.loading(false)
      })
    );
  }
}
