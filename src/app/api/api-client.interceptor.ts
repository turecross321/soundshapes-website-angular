import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';

@Injectable()
export class ApiClientInterceptor implements HttpInterceptor {
  constructor(private apiClient: ApiClientService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.apiClient.sessionId) {
      request = request.clone({
        headers: request.headers.set('Authorization', this.apiClient.sessionId),
      });
    }

    return next.handle(request);
  }
}

export const ApiClientInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiClientInterceptor,
  multi: true,
};
