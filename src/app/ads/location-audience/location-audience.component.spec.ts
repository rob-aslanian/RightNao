import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAudienceComponent } from './location-audience.component';

describe('LocationAudienceComponent', () => {
  let component: LocationAudienceComponent;
  let fixture: ComponentFixture<LocationAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
