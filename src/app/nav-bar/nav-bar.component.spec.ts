import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;

  let fixture: ComponentFixture<NavBarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loginObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
      'signOut',
    ]);
    authServiceSpy.isAuthenticated.and.returnValue(loginObservable);

    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    loginObservable.next(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`an unauthenticated user should see a navbar with links for Home, College Search, Scholarships,Majors,Articles  
  and Login that have routerLink properties set to to the correct routes`, () => {
    // let links = fixture.debugElement.query(By.css('a')).nativeElement;
    let links = fixture.nativeElement.querySelectorAll('a');

    //branding
    expect(links[0].getAttribute('href')).toEqual('#');

    expect(links[1].textContent).toEqual('Home');
    expect(links[1].getAttribute('routerLink')).toEqual('/');

    expect(links[2].textContent).toEqual('University Data Search');
    expect(links[2].getAttribute('routerLink')).toEqual('/colleges');

    expect(links[3].textContent).toEqual('Majors');
    expect(links[3].getAttribute('routerLink')).toEqual('/majors');

    expect(links[4].textContent).toEqual('Login');
    expect(links[4].getAttribute('routerLink')).toEqual('/login');

    expect(links[5].textContent).toEqual('Sign Up');
    expect(links[5].getAttribute('routerLink')).toEqual('/signup');
    expect(links.length).toEqual(6);
  });

  it('login link should change to logout when a user logs in, and back to login if a user clicks the logout link', async () => {
    loginObservable.next(true);
    await fixture.whenStable(); //async operation subscription broadcast
    fixture.detectChanges(); //change of ngIf
    let logOut = fixture.nativeElement.querySelector('[data-test-id="logout"]');
    let createBio = fixture.nativeElement.querySelector(
      '[data-test-id="myAccount"]'
    );

    expect(logOut).toBeTruthy();
    expect(logOut.textContent).toEqual('Logout');
    expect(createBio).toBeTruthy();
    expect(createBio.getAttribute('routerLink')).toEqual('/my-account');

    //logout
    logOut.dispatchEvent(new Event('click'));
    loginObservable.next(false);
    await fixture.whenStable(); //async operation subscription broadcast
    fixture.detectChanges(); //change of ngIf

    //try to access hidden links
    logOut = fixture.nativeElement.querySelector('[data-test-id="logout"]');
    createBio = fixture.nativeElement.querySelector(
      '[data-test-id="myAccount"]'
    );

    expect(authServiceSpy.signOut).toHaveBeenCalled();
    expect(logOut).toBeFalsy();
    expect(createBio).toBeFalsy();
  });
});
