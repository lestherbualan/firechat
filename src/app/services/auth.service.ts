import { Injectable } from '@angular/core';
import { Auth, User, getAuth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginState: boolean = false;
  user$ = user(this._auth);
  auth = getAuth();

  constructor(private _auth: Auth, private _router: Router) { 
    this.user$.pipe(
      map((aUser: User | null) => {
        this.loginState = !!aUser;
      })
    ).subscribe();
  }

  checkAuthState(){
    return this.loginState;
  }

  logout(){
    return this._auth.signOut()
      .then(()=>{
        console.log('You logged out!')
        this._router.createUrlTree(['auth/login'])
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  handleRegister(form: FormGroup): Promise<any>{
    const email = form.get('email')?.value;
    const password = form.get('password')?.value;

    return createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );
  }

  handleLogin(form: FormGroup): Promise<any>{
    const email = form.get('email')?.value;
    const password = form.get('password')?.value;

    return signInWithEmailAndPassword(
      this._auth,
      email,
      password
    );
  }


}
