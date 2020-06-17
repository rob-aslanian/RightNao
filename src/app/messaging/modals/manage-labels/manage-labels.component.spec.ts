import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLabelsComponent } from './manage-labels.component';

describe('ManageLabelsComponent', () => {
  let component: ManageLabelsComponent;
  let fixture: ComponentFixture<ManageLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
