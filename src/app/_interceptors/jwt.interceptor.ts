import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private readonly validRequestForNotAddingToken: Array<string>;
    private readonly validGetRequestForNotAddingToken: Array<string>;

    constructor(private authService: AuthService, private tokenService: TokenStorageService) {
        this.validRequestForNotAddingToken = [
            "thanh_vien/dang_nhap",
            "thanh_vien/dang_ky",
            "thanh_vien/quen_mat_khau",
            "thanh_vien/thong-tin-converter",
            "thanh_vien/binh-luan/xem",
            "trang-chu",
            
        ];
        this.validGetRequestForNotAddingToken = [
            "thong-tin",
            "trang-chu",
            "danh-muc",
            "chuong",
            "truyen-home",
            "the-loai",
            "thanh_vien/xem_top_converter",
        ];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isValidRequestForInterceptor(request) && this.isValidGetRequestForInterceptor(request)) {
            this.tokenService.loadToken();
            const token = this.tokenService.getToken();

            // inject token into headers
            const modifiedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
            return next.handle(modifiedRequest);
        }

        return next.handle(request);
    }

    private isValidRequestForInterceptor(request: HttpRequest<unknown>): boolean {
        const positionIndicator = '8081/';
        //console.log(request.url);
        const position = request.url.indexOf(positionIndicator);
        //console.log(position);
        if (position > 0) {
          const destination = request.url.substr(position + positionIndicator.length);
          //console.log(destination);
          for (const address of this.validRequestForNotAddingToken) {
            if (new RegExp(address).test(destination)) {
              return false;
            }
          }
        }
        return true;
      }
    
      private isValidGetRequestForInterceptor(request: HttpRequest<unknown>): boolean {
        const positionIndicator = '8081/';
        const position = request.url.indexOf(positionIndicator);
        if (position > 0) {
          const destination = request.url.substr(position + positionIndicator.length);
          //console.log(destination);
          for (const address of this.validGetRequestForNotAddingToken) {
            if (new RegExp(address).test(destination) && request.method === 'GET') {
              return false;
            }
          }
        }
        return true;
      }
}