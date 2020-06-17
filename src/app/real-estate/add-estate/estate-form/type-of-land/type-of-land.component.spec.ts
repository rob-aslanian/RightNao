import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfLandComponent } from './type-of-land.component';

describe('TypeOfLandComponent', () => {
  let component: TypeOfLandComponent;
  let fixture: ComponentFixture<TypeOfLandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfLandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
