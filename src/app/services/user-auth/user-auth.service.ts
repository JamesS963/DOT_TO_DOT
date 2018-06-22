import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {User} from '../../providers/user';
import * as firebase from 'firebase/app';

/*
* User Authentication Service
* The purpose of this service is to handle user authentication functionality dealing
* with the login, logout and registration of user accounts aswell as checking if the user is logged in
*/

@Injectable()
export class UserAuthService {
  account = null;
  loggedIn = false;
  loggedUser: FirebaseObjectObservable<User> = null;
  authState = false;
  userID = null;

  constructor(private authentication: AngularFireAuth, private database: AngularFireDatabase) {
    authentication.authState.subscribe((res) => {
      if (res != null) {
        this.loggedUser = database.object('registeredUsers/' + res.uid);
        this.userID = res.uid;
        this.authState = true;
      } else {
        this.authState = false;
      }
    });
  }

  /**
   * check if the user has a session variable
   * if they are set the "loggedIn" value to true and set their data to the variable
   * if they aren't se the variable data to false to indicare they aren't logged in
   */
  getAuthState() {
    return this.authState;
  }

  // Add the user account to the database.
  initiateUserAccount(id) {
    return this.database.object('registeredUsers/').set({
      account: id,
      type: 'user'
    });
  }

  // Register the user account and password to firebase.
  register(email, password) {
    return this.authentication.auth.createUserWithEmailAndPassword(email, password);
  }

  // Login with email and password
  loginWithEmail(email, password) {
    return this.authentication.auth.signInWithEmailAndPassword(email, password);
  }

  // Login using a google account
  loginWithGoogle() {
    return this.authentication.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // login using a twitter account
  loginWithTwitter() {
    return this.authentication.auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  // login using a facebook account
  loginWithFacebook() {
    return this.authentication.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  // logout the user
  logout() {
    return this.authentication.auth.signOut();
  }

  // get the logged in users data
  getLoggedUser() {
    return this.loggedUser;
  }

  getUserID() {
    return this.userID;
  }

  updateProfile(profile) {
    return this.loggedUser.update(profile);
  }
}
