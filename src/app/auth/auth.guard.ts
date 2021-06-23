import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

              //to check if desired route can be activated. Returns true if it can. A UrlTree with a redirection to another route
              canActivate(
                route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot
              ):
                | boolean
                | UrlTree
                | Promise<boolean | UrlTree>
                | Observable<boolean | UrlTree> {
                return this.authService.user.pipe(
                  //takes the first emitted user
                  take(1),
                  //A function that returns an Observable that emits the values from the source Observable transformed by the given project function.
                  map(user => {
                    const isAuth = !!user;
                    if (isAuth) {
                      return true;
                    }
                    return this.router.createUrlTree(['/auth']);
                  })
                );
              }
}
