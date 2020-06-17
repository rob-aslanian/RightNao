import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCreateResponsiveComponent } from './ads-create-responsive.component';

describe('AdsCreateResponsiveComponent', () => {
  let component: AdsCreateResponsiveComponent;
  let fixture: ComponentFixture<AdsCreateResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCreateResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCreateResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
