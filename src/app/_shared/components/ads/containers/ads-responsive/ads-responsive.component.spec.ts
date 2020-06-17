import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsResponsiveComponent } from './ads-responsive.component';

describe('AdsResponsiveComponent', () => {
  let component: AdsResponsiveComponent;
  let fixture: ComponentFixture<AdsResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
