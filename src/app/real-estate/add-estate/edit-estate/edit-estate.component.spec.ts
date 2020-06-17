import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstateComponent } from './edit-estate.component';

describe('EditEstateComponent', () => {
  let component: EditEstateComponent;
  let fixture: ComponentFixture<EditEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
