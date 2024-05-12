import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

export class UnauthGuard implements CanActivate {
    constructor(private router: Router){};
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
            const token = sessionStorage.getItem("auth-token");
            if (!token){
                return true
            } else {
                this.router.navigate(['']);
                return false;
            }
        }

}
