import {Injectable} from '@angular/core';

@Injectable()
export class FirebaseDataProvider {
  live = {
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/profile%2F',
    projectPicture: 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/projects%2F',
    supplerPicture: 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/suppliers%2F'
  };
  dev = {
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/project--5383574466381407389.appspot.com/o/profile%2F',
    projectPicture: 'https://firebasestorage.googleapis.com/v0/b/project--5383574466381407389.appspot.com/o/projects%2F',
    supplierPicture: 'https://firebasestorage.googleapis.com/v0/b/project--5383574466381407389.appspot.com/o/suppliers%2F',

    apiKey: 'AIzaSyBw-rY-khKozG8qeSqdO7iO6fdyc5bt5Qo',
    authDomain: 'project--5383574466381407389.firebaseapp.com',
    databaseURL: 'https://project--5383574466381407389.firebaseio.com',
    projectId: 'project--5383574466381407389',
    storageBucket: 'project--5383574466381407389.appspot.com',
    messagingSenderId: '6272813349'
  };
  data;
  constructor() {
   this.data = this.live;
  }
}
