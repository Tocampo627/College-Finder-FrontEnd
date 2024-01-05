import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollegeSearchComponent } from './college-search/college-search.component';
import { MajorsComponent } from './majors/majors.component';
import { LoginComponent } from './login/login.component';

import { FooterComponent } from './footer/footer.component';
import { DataAttributionComponent } from './data-attribution/data-attribution.component';

import { MaterialModule } from './material/material.module';
import { SignUpComponent } from './signup/signup.component';
import { StudentAccountComponent } from './student-accounts/student-account.component';

import { StudentDetailsComponent } from './student-details/student-details.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollegeListComponent } from './college-list/college-list.component';
import { DisplayInformationComponent } from './display-information/display-information.component';
import { MatchComponent } from './match/match.component';
// import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CollegeSearchComponent,
    MajorsComponent,
    LoginComponent,
    FooterComponent,
    DataAttributionComponent,
    SignUpComponent,
    StudentAccountComponent,
    StudentDetailsComponent,
    CreateProfileComponent,
    EditProfileComponent,
    CollegeListComponent,
    DisplayInformationComponent,
    MatchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
