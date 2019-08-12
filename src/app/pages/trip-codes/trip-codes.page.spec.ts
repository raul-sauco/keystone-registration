import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCodesPage } from './trip-codes.page';

describe('TripCodesPage', () => {
  let component: TripCodesPage;
  let fixture: ComponentFixture<TripCodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
