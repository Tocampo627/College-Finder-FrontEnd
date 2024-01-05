import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAttributionComponent } from './data-attribution.component';

describe('DataAttributionComponent', () => {
  let component: DataAttributionComponent;
  let fixture: ComponentFixture<DataAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAttributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
