import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private readonly _authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.min(6),Validators.required])
  })

  login(){
    
    if (this.loginForm.valid){
      this._authService.handleLogin(this.loginForm).then((user: User)=>{
        console.log(user);
      });
    }
  }

}
