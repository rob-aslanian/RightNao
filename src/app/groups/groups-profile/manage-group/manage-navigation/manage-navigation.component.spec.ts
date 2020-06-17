import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNavigationComponent } from './manage-navigation.component';

describe('ManageNavigationComponent', () => {
  let component: ManageNavigationComponent;
  let fixture: ComponentFixture<ManageNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
