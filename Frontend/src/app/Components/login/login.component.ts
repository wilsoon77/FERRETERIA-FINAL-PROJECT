import { Component } from '@angular/core';

//import { DialogService } from 'primeng/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;
  
  validateLogin(username: string, password: string): void {
    if (username === 'Admin' && password === '1234') {
      this.isLoggedIn = true;
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  
}
