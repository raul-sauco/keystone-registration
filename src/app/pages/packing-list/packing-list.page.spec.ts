import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListPage } from './packing-list.page';

describe('PackingListPage', () => {
  let component: PackingListPage;
  let fixture: ComponentFixture<PackingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
