import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'zone.js';
import 'reflect-metadata';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
///****************** FIREBASE **********************************//
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';




import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule , AgmMap, AgmMarker   } from '@agm/core';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { ProjectsComponent } from './projects/projects.component';

import { UsersProfilesComponent } from './users-profiles/users-profiles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {CoreModule} from './app.core.modules';
import { Ng2MapModule} from 'ng2-map';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacebookModule } from 'ngx-facebook';

import 'hammerjs';

import {MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  // MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
 } from '@angular/material';

import {DirectionsMapDirective } from './maps/googlemaps.directions';

import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './login/auth.guard';
import {MapsService} from './services/maps.service';
import {GeolocationService} from './services/geolocation.service';
import {GeocodingService} from './services/geocoding.service';
import {AF} from './providers/af';
import {CreateProjectComponent} from './createProject/createProject.component';
import {AccountSetupComponent} from './accountSetup/accountSetup.component';
import {ProjectService} from './services/localProject.service';
import {UserService} from './services/localUser.service';
import {UserAuthService} from './services/user-auth/user-auth.service';
import {MyProfileComponent} from './myProfile/myProfile.component';
import {CreateAdminComponent} from './createAdmin/createAdmin.component';
import {AdminDashboardComponent} from './adminDashboard/adminDashboard.component';
import {ProjectRequestComponent} from './projectRequest/projectRequest.component';
import {AdminComponent} from './admin/admin.component';
import {ProfileEditComponent} from './profileEdit/profileEdit.component';
import {MyProjectsComponent} from './myProjects/myProjects.component';
import {AccountStatusComponent} from './accountStatus/accountStatus.component';
import { MenuComponent } from './menu/menu.component';
import {GoogleMapsComponent} from './maps/googlemaps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectFilterComponent } from './project-filter/project-filter.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProjectSummaryComponent} from './project-summary/project-summary.component';
import {RecycledSupplierComponent} from './recycled-supplier/recycled-supplier.component';
import {GMapModule, ChartModule } from 'primeng/primeng';
import { MyCompComponent } from './my-comp/my-comp.component';
import { ScienceFilterPipe , SearchPipe } from './map/science-filter.pipe';
import {UploadFileService} from './services/uploadFile.servive';
import {ProjectFilterDataService} from './project-filter/project-filter-data.service';
import { MapLayersComponent } from './map-layers/map-layers.component';
import {MarkersService} from './maps/markers.service';
import { SupplierRequestComponent } from './supplier-request/supplier-request.component';
import { WhatIsComponent } from './what-is/what-is.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { PartnersComponent } from './partners/partners.component';
import { UsefulLinksComponent } from './useful-links/useful-links.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyProjectComponent } from './my-project/my-project.component';
import {FirebaseDataProvider} from './providers/firebaseDataProvider';
import { DonationsComponent } from './donations/donations.component';
import { FileTypeValidatorDirective } from './directives/file-type-validator.directive';
import { FacebookPostsComponent } from './facebook-posts/facebook-posts.component';

import {FaceBookPostsService} from './providers/facebook-graph-service.service';
import {PostsList} from './facebook-posts/facebook-posts-list';
import {DonationsService} from './services/donations.service';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { MySuppliesComponent } from './my-supplies/my-supplies.component';
import { CollectSuppliesComponent } from './collect-supplies/collect-supplies.component';
import { MySupplyComponent } from './my-supply/my-supply.component';
import {ChartsModule} from 'ng2-charts';

export let MD_MODULES: any = [
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdChipsModule,
  // MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];

/*  UAT */

export const firebaseConfigUAT = {
  apiKey: 'AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc',
  authDomain: 'project--1058925460034076790.firebaseapp.com',
  databaseURL: 'https://project--1058925460034076790.firebaseio.com',
  storageBucket: 'project--1058925460034076790.appspot.com',
  messagingSenderId: '779470844821'
};




/*  DEV */

export const firebaseConfigDEV = {
  apiKey: 'AIzaSyBw-rY-khKozG8qeSqdO7iO6fdyc5bt5Qo',
  authDomain: 'project--5383574466381407389.firebaseapp.com',
  databaseURL: 'https://project--5383574466381407389.firebaseio.com',
  projectId: 'project--5383574466381407389',
  storageBucket: 'project--5383574466381407389.appspot.com',
  messagingSenderId: '6272813349'
};



/*
/*
export consrebaseAuthConfig = {
  provider: AuthProviders.Password,
  method:  AuthMethods.Password
}

*/

//  GoogleMapsComponent,


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SafeUrlPipe,
    DirectionsMapDirective,
    ProjectsComponent,
    UsersProfilesComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    GoogleMapsComponent,
    CreateProjectComponent,
    AccountSetupComponent,
    MyProfileComponent,
    CreateAdminComponent,
    AdminDashboardComponent,
    ProjectRequestComponent,
    AdminComponent,
    ProfileEditComponent,
    MyProjectsComponent,
    AccountStatusComponent,
    MenuComponent,
    NotificationsComponent,
    ProjectFilterComponent,
    FooterComponent,
    SearchComponent,
    ProjectSummaryComponent,
    RecycledSupplierComponent,
    MyCompComponent,
    ScienceFilterPipe,
    SearchPipe,
    MapLayersComponent,
    SupplierRequestComponent,
    WhatIsComponent,
    AboutUsComponent,
    FaqComponent,
    PartnersComponent,
    UsefulLinksComponent,
    EditProfileComponent,
    ResetPasswordComponent,
    MyProjectComponent,
    DonationsComponent,
    FileTypeValidatorDirective,
    FacebookPostsComponent,
    PostsList,
    SuppliersComponent,
    MySuppliesComponent,
    CollectSuppliesComponent,
    MySupplyComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    // GMapModule,
    ChartModule,
    AppRouting,
    Ng2MapModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJioRbIuJMQr14RqtvlIA587lm-HMHFD0' // google maps api key

    }), // google maps
    AngularFireModule.initializeApp(firebaseConfigDEV),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FacebookModule.forRoot(),
   /* AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
        authDomain: "project--1058925460034076790.firebaseapp.com",
        databaseURL: "https://project--1058925460034076790.firebaseio.com",
        storageBucket: "project--1058925460034076790.appspot.com"
        //messagingSenderId: "779470844821"
      }*/

    ...MD_MODULES
    /*,
    AngularFireModule.initializeApp(CoreModule.firebaseConfig),
    */
  ],
  providers: [
    // FIREBASE_PROVIDERS,
    FaceBookPostsService,
    AF,
    FirebaseDataProvider,
    // AngularFire,
    DonationsService,
    AuthGuard,
    MapsService,
    GeolocationService,
    GeocodingService,
    ProjectService,
    UserService,
    UserAuthService,
    UploadFileService,
    ProjectFilterDataService,
    MarkersService,
    ProjectService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    [MD_MODULES],

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
