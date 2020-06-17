import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCompanySecondComponent } from './ads-company-second.component';

describe('AdsCompanySecondComponent', () => {
  let component: AdsCompanySecondComponent;
  let fixture: ComponentFixture<AdsCompanySecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCompanySecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCompanySecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
