import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { StudentAccountComponent } from './student-account.component';

describe('StudentAccountComponent', () => {
  let component: StudentAccountComponent;
  let fixture: ComponentFixture<StudentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAccountComponent],
      imports: [HttpClientModule,RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
