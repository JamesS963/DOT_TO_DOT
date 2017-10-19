/**
 * Created by James on 18/05/2017.
 */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import {GeocodingService} from '../services/geocoding.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.scss']
})
export class CreateProjectComponent implements OnInit {
  get selectedType(): any {
    return this._selectedType;
  }

  set selectedType(value: any) {
    this._selectedType = value;
  }

  error: any;
  center: google.maps.LatLng;

  options = [
    {name: 'Art', value: 'Art & Design', checked: true},
    {name: 'Science', value: 'Science', checked: false},
    {name: 'Health', value: 'Health', checked: true},
    {name: 'Craft and workshop', value: 'Craft & Workshop', checked: true},
    {name: 'Education', value: 'Education', checked: true},
  ];
  _selectedType: any;
  constructor(private afService: AF, private GC: GeocodingService, private router: Router) { }

  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter (opt => opt.checked)
      .map (opt => opt.value);
  }


  protected interestHandler(event: any) {
    this._selectedType = event.target.value;
  }
  createProject(event, projectName, desc, sum, loc) {
    console.log('interest is ' + this._selectedType);
    event.preventDefault();
    //noinspection TypeScriptUnresolvedFunction
    this.GC.codeAddress(loc).forEach((results: google.maps.GeocoderResult[]) => {
      this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      console.log('lat is : ' + this.center.lat());
      console.log('long is : ' + this.center.lng());
    }).then(() => {
      this.afService.sendProjectRequest(projectName, desc, sum, this._selectedType, this.center.lat(), this.center.lng()).then((project) => {
        console.log('project id is' + project.key);
        this.afService.saveProjectID(project.key);
        this.afService.saveProjectToUser(project.key).then(() => {

          this.router.navigate(['']);
        })
          .catch((error) => {
            this.error = error;
          });
      })
        .catch((error) => {
          this.error = error;
          console.log(this.error);
        });
    }).catch(
      (status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
          console.log('no results');
        }
      });
  }

  ngOnInit() {
  }

}
