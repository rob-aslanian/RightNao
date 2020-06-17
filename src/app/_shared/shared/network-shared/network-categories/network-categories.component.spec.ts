import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkCategoriesComponent } from './network-categories.component';

describe('NetworkCategoriesComponent', () => {
  let component: NetworkCategoriesComponent;
  let fixture: ComponentFixture<NetworkCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
