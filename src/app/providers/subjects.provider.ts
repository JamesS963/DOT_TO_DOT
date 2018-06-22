import {Injectable} from '@angular/core';

@Injectable()
export class FirebaseDataProvider {
  subjects = [
    {name: 'Art', value: 'Art & Design', checked: false},
    {name: 'Science', value: 'Science', checked: false},
    {name: 'Health', value: 'Health', checked: false},
    {name: 'Craft', value: 'Craft & Workshop', checked: false},
    {name: 'Education', value: 'Education', checked: false},
  ];

  constructor() {

  }
}
