import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authenticationService: AuthService, private router: Router, private toastr: ToastrService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = next.data['roles'] as Array<string>;
    if (roles) {
      const match = this.authenticationService.roleMatch(roles);
      if (match) {
        return true;
      }
    }
    this.toastr.info('Bạn ko có quyền truy cập vào đây!!!');
    return false;
  }
  
}
