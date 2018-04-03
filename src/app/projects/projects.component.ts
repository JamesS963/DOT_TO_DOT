import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from '../app.routing';
import {AF} from '../providers/af';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {Member, Project, Message} from '../providers/project';
import {AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {FacebookModule, FacebookService, InitParams} from 'ngx-facebook';
import {MD_PROVIDERS} from '../app.material.providers';
/* Updated by Alexander for angular 4 */

@Component({
  selector: 'app-projects',
  templateUrl: './index.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  // chart stuff
  public doughnutChartLabels: string[] = ['Total got', 'Amount Needed'];
  public doughnutChartData: number[][] = [[350, 450]];
  public doughnutChartType: string = 'doughnut';
  currentUser: FirebaseObjectObservable<any>;
  error: any;
  project: FirebaseObjectObservable<Project>;
  id: string;
  isMember: boolean;

  // this is currently a work around because of problems subscribing for some reason, will be fixed later
  projects: FirebaseListObservable<Project[]>;
  projectData: {};
  messages: FirebaseListObservable<Message[]>;
  posts: any;
  userID: string;
  owner: string;
  projectID: string;
  currentProject: Project;
  facebookMessage: string;
  notifications: FirebaseListObservable<any>;
  itemsWanted: FirebaseListObservable<any>;
  joined: boolean = false;
  counter: number = 0;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;


  constructor(private afService: AF, private router: Router, private afAuth: AngularFireModule, private db: AngularFireDatabase, private route: ActivatedRoute, private fb: FacebookService) {



    db.list('projects/' + this.route.snapshot.params['id'] + 'members').subscribe((m) => {
      for (const mem of m ) {
        if (mem.id === this.afService.userID) { this.joined = true; }
      }
    });
    this.itemsWanted = db.list('projects/' + this.route.snapshot.params['id'] + '/itemsWanted');
    this.project = db.object('projects/' + this.route.snapshot.params['id']);
    this.messages = db.list('projects/' + this.route.snapshot.params['id'] + '/messages');
    this.notifications = db.list('projects/' + this.route.snapshot.params['id'] + '/notifications');
    this.currentUser = this.afService.getUser(this.afService.userID);
    this.projectID = this.route.snapshot.params['id'];
    this.project.subscribe((p) => {
      this.projectData = p;

      if (p.itemsWanted != null) {
        for (const item of p.itemsWanted) {
          let first = parseInt(item.amountRequired, 10);
          let second = parseInt(item.currentAmount, 10);
          first = (second / first) * 100;
          second = 100 - first;
          this.doughnutChartData.push([]);
          this.doughnutChartData[this.counter][0] = first;
          this.doughnutChartData[this.counter][1] = second;
          this.counter++;

        }
      }
      // for (m in p.members){
      // console.log (m.id)
      // }
    });
    console.log(this.project);
    // this.currentProject= <Project>this.project;
    // this.facebookMessage= "View this great project on DOT to DOT <b>"+this.currentProject.name+"</b> <br/> <h2>summary </h2><br/>"+ this.currentProject.summary;

    this.userID = afService.userID;
    let initParams: InitParams = {
      appId: '1601932213156995',
      xfbml: true,
      version: 'v2.8'

    };


    fb.init(initParams);

  }





  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('params are' + this.id);
  }

  // FUNCTION CALL TO MAKE USER JOIN A PROJECT
  join() {
    alert('its doing something');
    this.afService.join(this.route.snapshot.params['id']).then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.error = error;
      console.log(this.error);
    });
  }

  postUpdate() {}

  sendMessage() {
    console.log('new message = ' + this.newMessage);

   /* if(this.currentUser!=udefined) {
      this.afService.sendMessage(this.newMessage, this.currentUser);
    }
    else
      {*/
    console.log(this.currentUser);

    this.afService.getProjectMessages(this.route.snapshot.params['id']);
    this.afService.sendMessage(this.newMessage, '../../images/avatar.png');
     //}
    console.log('Message Sent');
    this.newMessage = '';

  }

  isYou(email) {
    if(email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email) {
    if(email == this.afService.email)
      return false;
    else
      return true;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}

