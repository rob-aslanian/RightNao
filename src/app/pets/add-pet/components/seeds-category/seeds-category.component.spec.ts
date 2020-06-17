import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsCategoryComponent } from './seeds-category.component';

describe('SeedsCategoryComponent', () => {
  let component: SeedsCategoryComponent;
  let fixture: ComponentFixture<SeedsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
