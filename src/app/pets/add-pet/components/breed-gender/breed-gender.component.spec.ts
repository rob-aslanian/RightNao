import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedGenderComponent } from './breed-gender.component';

describe('BreedGenderComponent', () => {
  let component: BreedGenderComponent;
  let fixture: ComponentFixture<BreedGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
