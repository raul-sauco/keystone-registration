import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverPage } from './waiver.page';

describe('WaiverPage', () => {
  let component: WaiverPage;
  let fixture: ComponentFixture<WaiverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
