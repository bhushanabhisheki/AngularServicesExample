import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>, //applicable for any type of response data
    next: HttpHandler //forwards the request
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    return next.handle(modifiedRequest);
    //If you don't return next handle and pass the request, then the request will not continue
  }
}
