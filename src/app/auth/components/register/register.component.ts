import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.min(6),Validators.required])
  })

  register(){    
    if (this.registerForm.valid){
      this._authService.handleRegister(this.registerForm).then((user: User)=>{
        console.log(user);
      });
    }
  }
}
