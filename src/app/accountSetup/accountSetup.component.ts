import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import {FileUpload} from '../objects/file';
import {UploadFileService} from '../services/uploadFile.servive';
import {FirebaseDataProvider} from '../providers/firebaseDataProvider';
import {FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database/database';
import {FormControl, FormGroup} from '@angular/forms';
import {FileTypeValidatorDirective} from '../directives/file-type-validator.directive';
import {UserAuthService} from '../services/user-auth/user-auth.service';

@Component({
  selector: 'app-accountSetup',
  templateUrl: './accountSetup.component.html',
  styleUrls: ['./accountSetup.component.scss']
})
export class AccountSetupComponent {
  // error to display if there are any problems
  error: any;
  form;
  user: FirebaseObjectObservable<any>;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = {percentage: 0};
  private _options = [
    {name: 'Art', value: 'Art & Design', checked: false},
    {name: 'Science', value: 'Science', checked: false},
    {name: 'Health', value: 'Health', checked: false},
    {name: 'Craft', value: 'Craft & Workshop', checked: false},
    {name: 'Education', value: 'Education', checked: false},
  ];

  constructor(private authentication: UserAuthService, private afService: AF, private router: Router, private uploadService: UploadFileService, private firebaseData: FirebaseDataProvider, db: AngularFireDatabase) {
    this.user = this.authentication.getLoggedUser();

    this.form = new FormGroup({
      file: new FormControl('', [FileTypeValidatorDirective.validate])
    });
  }

  // get selected file from the dom
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload the picture to storage
  upload(id, name) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, '/profile', id, name);
  }

  // filter the interests
  get selectedOptions() { // right now: ['1','3']
    return this._options
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }

  register(event, name, description, summary, facebook, twitter) {

    // set the data to be added to the user account
    const picture = this.firebaseData.data.profilePicture + this.afService.userID + '%2Fprofilepic?alt=media';
    const profile = {
      avatar: picture,
      name: name,
      description: description,
      summary: summary,
      facebook: facebook,
      twitter: twitter,
      interests: this.selectedOptions,
    };

    if (this.selectedFiles.item(0).name.split('.').pop().toUpperCase() !== 'JPG' || 'PNG') {
      this.error = 'incorrect file format';
    } else {
      // update the users profile
      this.authentication.updateProfile(profile).then((success) => {
        if (this.selectedFiles != null) {
          this.upload(this.authentication.getUserID(), 'profilepic');
        } else {
          this.error = 'Please Select a picture to upload';
        }
      }).catch((error) => {
        this.error = error;
      });
    }
  }

  get options(): ({ name: string; value: string; checked: boolean } | { name: string; value: string; checked: boolean } |
    { name: string; value: string; checked: boolean } | { name: string; value: string; checked: boolean } | { name: string; value: string; checked: boolean })[] {
    return this._options;
  }

  set options(value: ({ name: string; value: string; checked: boolean } |
    { name: string; value: string; checked: boolean } | { name: string; value: string; checked: boolean } |
    { name: string; value: string; checked: boolean } | { name: string; value: string; checked: boolean })[]) {
    this._options = value;
  }

}
