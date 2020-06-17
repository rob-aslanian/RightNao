import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoxComponent } from './manage-box.component';

describe('ManageBoxComponent', () => {
  let component: ManageBoxComponent;
  let fixture: ComponentFixture<ManageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
