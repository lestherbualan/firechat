import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  user$ = user(this._auth);
  private readonly onDestroy$ = new Subject<void>();

  constructor(private _auth: Auth) {}
  
  ngOnInit(): void {
    this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
