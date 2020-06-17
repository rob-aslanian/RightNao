import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEstateComponent } from './manage-estate.component';

describe('ManageEstateComponent', () => {
  let component: ManageEstateComponent;
  let fixture: ComponentFixture<ManageEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
