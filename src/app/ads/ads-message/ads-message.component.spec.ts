import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsMessageComponent } from './ads-message.component';

describe('AdsMessageComponent', () => {
  let component: AdsMessageComponent;
  let fixture: ComponentFixture<AdsMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
