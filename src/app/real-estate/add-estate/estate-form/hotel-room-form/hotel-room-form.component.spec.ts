import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomFormComponent } from './hotel-room-form.component';

describe('HotelRoomFormComponent', () => {
  let component: HotelRoomFormComponent;
  let fixture: ComponentFixture<HotelRoomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelRoomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
