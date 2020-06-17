import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesHoursComponent } from './busines-hours.component';

describe('BusinesHoursComponent', () => {
  let component: BusinesHoursComponent;
  let fixture: ComponentFixture<BusinesHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
