import { routes } from './app-routing.module';
import { CollegeSearchComponent } from './college-search/college-search.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { MajorsComponent } from './majors/majors.component';
import { AuthService } from './services/auth.service';
import { StudentAccountComponent } from './student-accounts/student-account.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { DataAttributionComponent } from './data-attribution/data-attribution.component';

describe('app-routing.module', () => {
  it('should have a route for /my-account/:id', () => {
    let myAccountRoute = routes.find((route) => route.path == 'my-account/:id');
    expect(myAccountRoute).toBeTruthy();
    expect(myAccountRoute?.component).toEqual(StudentDetailsComponent);
  });

  it('should have a route for /login matched to LoginComponent', () => {
    let loginRoute = routes.find((route) => route.path == 'login');
    expect(loginRoute).toBeTruthy();
    expect(loginRoute?.component).toEqual(LoginComponent);
  });

  it('should have a route for /signup matched to SignupComponent', () => {
    let signUpRoute = routes.find((route) => route.path == 'signup');
    expect(signUpRoute).toBeTruthy();
    expect(signUpRoute?.component).toEqual(SignUpComponent);
  });

  it('should have a route for /colleges matched to CollegeSearchComponent', () => {
    let collegeSearchRoute = routes.find((route) => route.path == 'colleges');
    expect(collegeSearchRoute).toBeTruthy();
    expect(collegeSearchRoute?.component).toEqual(CollegeSearchComponent);
  });

  it('should have a route for /majors matched to MajorsComponent', () => {
    let majorsRoute = routes.find((route) => route.path == 'majors');
    expect(majorsRoute).toBeTruthy();
    expect(majorsRoute?.component).toEqual(MajorsComponent);
  });

  it('should have guarded route for create-profile', () => {
    let loginRoute = routes.find((route) => route.path == 'create-profile');
    expect(loginRoute).toBeTruthy();
    expect(loginRoute?.canActivate).toEqual([AuthService]);
  });
  it('should have a route for /data-attribution matched to DataAttributionComponent', () => {
    let dataAttRoute = routes.find((route) => route.path == 'data-attribution');
    expect(dataAttRoute).toBeTruthy();
    expect(dataAttRoute?.component).toEqual(DataAttributionComponent);
  });
});
