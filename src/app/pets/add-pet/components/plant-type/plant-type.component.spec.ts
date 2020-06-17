import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTypeComponent } from './plant-type.component';

describe('PlantTypeComponent', () => {
  let component: PlantTypeComponent;
  let fixture: ComponentFixture<PlantTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
