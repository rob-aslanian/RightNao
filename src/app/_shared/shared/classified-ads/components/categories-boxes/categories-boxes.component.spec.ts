import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBoxesComponent } from './categories-boxes.component';

describe('CategoriesBoxesComponent', () => {
  let component: CategoriesBoxesComponent;
  let fixture: ComponentFixture<CategoriesBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
