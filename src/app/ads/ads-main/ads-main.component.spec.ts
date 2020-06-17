import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsMainComponent } from './ads-main.component';

describe('AdsMainComponent', () => {
  let component: AdsMainComponent;
  let fixture: ComponentFixture<AdsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
