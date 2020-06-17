import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEstateHeaderSearchComponent } from './manage-estate-header-search.component';

describe('ManageEstateHeaderSearchComponent', () => {
  let component: ManageEstateHeaderSearchComponent;
  let fixture: ComponentFixture<ManageEstateHeaderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEstateHeaderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEstateHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
