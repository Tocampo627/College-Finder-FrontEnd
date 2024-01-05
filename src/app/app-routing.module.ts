import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegeListComponent } from './college-list/college-list.component';
import { CollegeSearchComponent } from './college-search/college-search.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { DataAttributionComponent } from './data-attribution/data-attribution.component';
import { DisplayInformationComponent } from './display-information/display-information.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';

import { MajorsComponent } from './majors/majors.component';
import { MatchComponent } from './match/match.component';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from './signup/signup.component';
import { StudentAccountComponent } from './student-accounts/student-account.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

// defining all possible routes for the app, each route is an object
export const routes: Routes = [
  { path: 'colleges', component: CollegeSearchComponent },
  { path: 'majors', component: MajorsComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'data-attribution', component: DataAttributionComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'my-account', component: StudentAccountComponent },
  { path: 'my-account/:id', component: StudentDetailsComponent },
  {
    path: 'create-profile',
    component: CreateProfileComponent,
    canActivate: [AuthService],
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  { path: 'college-list', component: CollegeListComponent },
  { path: 'diplay-info', component: DisplayInformationComponent },
  { path: 'match', component: MatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
