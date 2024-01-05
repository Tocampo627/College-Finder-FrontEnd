import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { StudentService } from './student.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have auth behaviorSubject that publishes "false" initially', () => {
    service.isAuthenticated().subscribe((res) => expect(res).toBeFalse());
  });
  // it('should have a signIn method that broadcasts true from isAuthenticated and a logOut method that broadcast false', () => {
  //   service.signIn();
  //   service.isAuthenticated().subscribe((res) => expect(res).toBeTrue());
  // });

  // it('should have a signOut method tha tbroadcast false', () => {
  //   service.signIn();
  //   service.signOut();
  //   service.isAuthenticated().subscribe((res) => expect(res).toBeFalse());
  // });

  it('should have a canActivate method that retruns false if user is logged in and should navigate back to home ', () => {
    service.canActivate().subscribe((res) => {
      expect(res).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    });
  });

  // it('should have a canActivate method that retruns true if user is logged in ', () => {
  //   service.signIn();
  //   service.canActivate().subscribe((res) => expect(res).toBeTrue());
  // });
});
