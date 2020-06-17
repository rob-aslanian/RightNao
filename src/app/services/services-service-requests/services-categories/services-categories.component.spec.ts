import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCategoriesComponent } from './services-categories.component';

describe('ServicesCategoriesComponent', () => {
  let component: ServicesCategoriesComponent;
  let fixture: ComponentFixture<ServicesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
