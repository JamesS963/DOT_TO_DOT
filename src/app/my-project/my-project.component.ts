import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {ActivatedRoute, Router} from '@angular/router';
import {AF} from '../providers/af';

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


  constructor(private afService: AF, private router: Router, private afAuth: AngularFireModule, private db: AngularFireDatabase, private route: ActivatedRoute ) {
    this.project = db.object('projects/' + this.route.snapshot.params['id']);

    this.notifications = db.list('projects/' + this.route.snapshot.params['id'] + '/notifications');
    this.project.subscribe((p) => {
      this.projectData = p;
      this.id = p.id;
      this.donations = p.donations;
    });
    this.userID = afService.userID;
  }

  postUpdate($event, title, message) {
    alert(message);
    alert(title);
    this.afService.postProjectNotification(message, '../../images/avatar.png', this.route.snapshot.params['id'], title );
    console.log('Message Sent');
  }

  ngOnInit() {
  }

}
