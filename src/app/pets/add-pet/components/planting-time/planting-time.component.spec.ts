import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingTimeComponent } from './planting-time.component';

describe('PlantingTimeComponent', () => {
  let component: PlantingTimeComponent;
  let fixture: ComponentFixture<PlantingTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
