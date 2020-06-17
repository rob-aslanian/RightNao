import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFoodComponent } from './animal-food.component';

describe('AnimalFoodComponent', () => {
  let component: AnimalFoodComponent;
  let fixture: ComponentFixture<AnimalFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
