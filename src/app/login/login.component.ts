import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import {User} from '../providers/user';
import {UserAuthService} from '../services/user-auth/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})


export class LoginComponent implements OnInit {
  public error: any;
  user: User;
  isAuth: boolean;
  userType: string;
  userStatus: string;

  ngOnInit() {
    this.isAuth = this.authentication.getAuthState();
  }

  constructor(private authentication: UserAuthService, private afService: AF, private router: Router) {

  }

  /**
   * when the user is logged in this will check the users account status to correctly redirect them
   * to the right area on the app
   */
  loginRouter() {
    this.authentication.getLoggedUser().subscribe((res) => {
      if (res != null) {
        if (res.type === 'user') {
          this.router.navigate(['/userStatus']);
          alert('user is a user');
        }
        if (res.type === 'admin') {
          this.router.navigate(['/userStatus']);
          alert('user is an admin');
        }
      } else {
        console.log('null');
        this.router.navigate(['/userStatus']);
      }
    });
  }

  /**
   * Attempts to log the user into the application through a twitter account
   * then checks what type of user is logged in to redirect them to the correct location.
   */
  loginWithEmail(event, email, password) {
    this.authentication.loginWithEmail(email, password).then((success) => {
      this.loginRouter();
    }).catch((err) => {
      this.error = err;
    });
    alert(this.authentication.getAuthState());
  }

  /**
   * Attempts to log the user into the application through a twitter account
   * then checks if the users account already exists or not.
   */
  loginWithTwitter() {
    this.authentication.loginWithTwitter().then((result) => {
      this.loginRouter();
    }).catch((error) => {
      alert('error');
    });
  }

  /**
   * Attempts to log the user into the application through a google account
   * then checks if the users account already exists or not.
   */
  loginWithGoogle() {
    this.authentication.loginWithGoogle().then((result) => {
      alert('working');
      this.loginRouter();
    }).catch((error) => {
      alert('error');
    });
  }

  /**
   * Attempts to log the user into the application through a facebook account
   * then checks if the users account already exists or not to redirect them to the
   * correct location.
   */
  loginWithFacebook() {
    this.authentication.loginWithFacebook().then((data) => {
      this.loginRouter();
    });
  }

  /**
   * Logs out the user
   */
  logout() {
    this.authentication.logout();
    this.isAuth = false;
  }


  /**
   * adds user information to the database
   * @param user
   * @returns {any}
   * @private
   */
  private _getUserInfo(user: any): any {
    if (!user) {
      return {};
    }
    const data = user.auth.providerData[0];
    return {
      name: data.name,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }


}
