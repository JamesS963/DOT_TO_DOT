import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {ActivatedRoute, Router} from '@angular/router';
import {AF} from '../providers/af';
import {DonationsService} from '../services/donations.service';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss']
})

export class MyProjectComponent implements OnInit {
  error: any;
  project: FirebaseObjectObservable<any>;
  id: string;
  isMember: boolean;
  projects: FirebaseListObservable<any>;
  projectData: {};
  notifications: FirebaseListObservable<any>;
  donations: FirebaseListObservable<any>;
  userID;
  hoursDonations;

  constructor(private afService: AF, private router: Router, private afAuth: AngularFireModule,
              private db: AngularFireDatabase, private route: ActivatedRoute, private donationsService: DonationsService ) {
    this.project = db.object('projects/' + this.route.snapshot.params['id']);
    this.donations = db.list('projects/' + this.route.snapshot.params['id'] + '/donations');
    this.hoursDonations =  db.list('projects/' + this.route.snapshot.params['id'] + '/workingHours');
    this.notifications = db.list('projects/' + this.route.snapshot.params['id'] + '/notifications');
    this.project.subscribe((p) => {
      this.projectData = p;
      this.id = p.id;

    });
    this.userID = afService.userID;
  //  alert(this.route.snapshot.params['id']);
  }

  join() {
    this.afService.join(this.route.snapshot.params['id']).then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.error = error;
      console.log(this.error);
    });
  }

  postUpdate($event, title, message) {
    this.afService.postProjectNotification(message, '../../images/avatar.png', this.route.snapshot.params['id'], title );
    console.log('Message Sent');
  }

  ngOnInit() {
  }

  acceptDonation(amount , id, i) {
    this.donationsService.setDonation(amount , this.id, id, i);
    this.donationsService.acceptDonation();
  }

  acceptHours(hours, donationIndex ) {
    this.donationsService.setWorkingTime(hours, this.id, donationIndex);
    this.donationsService.acceptWorkingTime();
  }
  declineDonation() {
  }
}
