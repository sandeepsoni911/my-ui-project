import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoppingApp';
  constructor(public _authService: AuthService){}


  logOut(){
    console.log('logging out ...')
    this._authService.logout();
  }
  
}
