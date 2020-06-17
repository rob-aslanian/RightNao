import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCandidateListComponent } from './manage-candidate-list.component';

describe('ManageCandidateListComponent', () => {
  let component: ManageCandidateListComponent;
  let fixture: ComponentFixture<ManageCandidateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCandidateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
