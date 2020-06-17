import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAdsComponent } from './demo-ads.component';

describe('DemoAdsComponent', () => {
  let component: DemoAdsComponent;
  let fixture: ComponentFixture<DemoAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
