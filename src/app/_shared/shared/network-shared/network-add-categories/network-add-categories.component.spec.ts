import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAddCategoriesComponent } from './network-add-categories.component';

describe('NetworkAddCategoriesComponent', () => {
  let component: NetworkAddCategoriesComponent;
  let fixture: ComponentFixture<NetworkAddCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkAddCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAddCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
