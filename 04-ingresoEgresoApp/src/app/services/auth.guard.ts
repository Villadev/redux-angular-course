import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {take, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canLoad(): Observable<boolean> {
        return this.authService.isAuth().pipe(
            tap(estado => {
                if (!estado) {
                    this.router.navigate(['/login']);
                }
            }),
            take(1)
        );
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuth().pipe(
            tap(estado => {
                if (!estado) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }

}
