import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@core/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>) {
    const token = this.tokenService.getToken();
    console.log(token);
    if (token) {
      req = req.clone({
        setHeaders: {
          token
        }
      });
      return req;
    }
    return req;
  }
}
