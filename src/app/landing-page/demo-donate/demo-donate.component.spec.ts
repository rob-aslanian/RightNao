import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDonateComponent } from './demo-donate.component';

describe('DemoDonateComponent', () => {
  let component: DemoDonateComponent;
  let fixture: ComponentFixture<DemoDonateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoDonateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
