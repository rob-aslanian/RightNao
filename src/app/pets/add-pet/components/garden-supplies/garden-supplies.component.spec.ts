import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenSuppliesComponent } from './garden-supplies.component';

describe('GardenSuppliesComponent', () => {
  let component: GardenSuppliesComponent;
  let fixture: ComponentFixture<GardenSuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenSuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
