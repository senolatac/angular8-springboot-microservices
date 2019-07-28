import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.currentUserValue) {
      this.router.navigate(['/home']);
      return;
    }
  }

  register(){
    this.userService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if(!err || err.status !== 409) {
        this.errorMessage = "Unexpected error occurred. Error : " + err;
      }else {
        this.errorMessage = "Username is already exist";
      }
    });
  }

}
