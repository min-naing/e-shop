import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: Router) { }

  ngOnInit() {

    this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.userService.save(result.user)
          .then(() => {
            const returnUrl = localStorage.getItem('returnUrl');
            if( !returnUrl ) return;

            this.route.navigateByUrl(returnUrl);
            localStorage.removeItem('returnUrl');
          });
      }
    });
  }

  login() {
    this.auth.login();
  }

}
