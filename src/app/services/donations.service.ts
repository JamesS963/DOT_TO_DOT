import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Injectable} from '@angular/core';

@Injectable()
export class DonationsService {
  donation: FirebaseObjectObservable<any>;
  d;
  hours: FirebaseObjectObservable<any>;
  h;
  newAmmount;
  newWorkingAmmount;
  constructor(private af: AngularFireDatabase) {}
  setDonation(amount, project, id, did) {
    this.newAmmount = amount;
    this.donation = this.af.object('projects/' + project + '/itemsWanted/' + id);
    this.donation.subscribe((e) => {
      this.d = e;
    });
    this.af.object('projects/' + project + '/donations/' + did).update({
      accepted: true
    });
  }
  acceptDonation() {
    const currentAmount = Number(this.d.currentAmount) + Number(this.newAmmount);
    this.donation.update({
      currentAmount: currentAmount,
    });
  }
  setWorkingTime(hours, projectID, donationIndex) {
    this.newWorkingAmmount = hours;
    this.hours = this.af.object('projects/' + projectID);
    this.hours.subscribe((e) => {
      this.h = e.currentHours;
    });
    this.af.object('projects/' + projectID + '/workingHours/' + donationIndex).update({
      accepted: true
    });
  }

  acceptWorkingTime() {
    const currentHours = Number(this.h) + Number(this.newWorkingAmmount);
    this.hours.update({
      currentHours: currentHours
    });
  }
}
