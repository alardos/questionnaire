import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router){};
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
            const token = sessionStorage.getItem("auth-token");
            if (token){
                return true
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        }

}
