import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationService } from '../_services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService, private notificationService: NotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse) {
          switch (errorResponse.status) {
            case 400:
              if (errorResponse.error.errors) {
                const modalStateErrors = [];
                for (const key in errorResponse.error.errors) {
                  if (errorResponse.error.errors[key]) {
                    modalStateErrors.push(errorResponse.error.errors[key])
                  }
                }
                throw modalStateErrors;
              } else if (typeof(errorResponse.error) === 'object') {
                this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
              } else {
                console.log("3333");
                // this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              this.toastr.error(errorResponse.statusText, errorResponse.status);
              break;
            case 404:
              //this.router.navigateByUrl('/not-found');
              break;
            case 500:
              // const navigationExtras: NavigationExtras = { state: { error: error.error } }
              // this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(errorResponse);
              break;
          }
        }
        return throwError(errorResponse);
      })
    )
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Có lỗi xảy ra. Vui lòng thử lại sau!');
    }
  }

}