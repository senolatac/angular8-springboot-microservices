import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-side';
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
    //Call it observable because it can be changed from other page like login.
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  logOut() {
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
