import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAccessoriesComponent } from './animal-accessories.component';

describe('AnimalAccessoriesComponent', () => {
  let component: AnimalAccessoriesComponent;
  let fixture: ComponentFixture<AnimalAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
