import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AF} from '../providers/af';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {

  project: FirebaseObjectObservable<any>;
  constructor(private afService: AF, private afAuth: AngularFireAuth, private db: AngularFireDatabase,
              private router: Router, private route: ActivatedRoute) {
    this.project = db.object('projects/' + this.route.snapshot.params['id']);

  }
  donateItem($event, amount, details, key) {
    alert('id is ' + key);
    this.db.list('projects/' + this.route.snapshot.params['id'] + '/donations').push({
      itemID: key,
      amount: amount,
      details: details,
      accepted: false,
      user: this.afService.userID
    }).then((e) => {
      this.db.object('projects/' + this.route.snapshot.params['id'] + '/donations/' + e.key).update({id: e.key});
    });
  }
  addWorkHours($event, hours, details) {
    this.db.list('projects/' + this.route.snapshot.params['id'] + '/workingHours').push({
      hours: hours,
      details: details,
      accepted: false,
      user: this.afService.userID
    }).then((e) => {
      this.db.object('projects/' + this.route.snapshot.params['id'] + '/workingHours/' + e.key).update({id: e.key});
    });

    }
  ngOnInit() {
  }

}
