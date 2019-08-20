import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCodesHelpComponent } from './trip-codes-help.component';

describe('TripCodesHelpComponent', () => {
  let component: TripCodesHelpComponent;
  let fixture: ComponentFixture<TripCodesHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCodesHelpComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCodesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
