import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Auth, User, user } from '@angular/fire/auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private _router: Router, private _auth: Auth){}
  
  isAuthenticated: boolean = false;
  user$ = user(this._auth);
  userSubscription: Subscription = new Subscription;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // since user$ is an observable, pipe is used to map out the data stream.
      return this.user$.pipe(
        map((aUser:User | null)=>{
          if (aUser != null) {
            console.log('is authenticated');
            return true;
          } else {
            // Redirect to the login page or any other desired route
            return this._router.createUrlTree(['/auth/login']);
          }
        })
      )
  }
  
}
