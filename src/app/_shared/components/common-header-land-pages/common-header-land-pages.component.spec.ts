import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHeaderLandPagesComponent } from './common-header-land-pages.component';

describe('CommonHeaderLandPagesComponent', () => {
  let component: CommonHeaderLandPagesComponent;
  let fixture: ComponentFixture<CommonHeaderLandPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonHeaderLandPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonHeaderLandPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
