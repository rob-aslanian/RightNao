import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCompanyComponent } from './ads-company.component';

describe('AdsCompanyComponent', () => {
  let component: AdsCompanyComponent;
  let fixture: ComponentFixture<AdsCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
