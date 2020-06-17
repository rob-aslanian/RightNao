import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacansyMatchContainerComponent } from './vacansy-match-container.component';

describe('VacansyMatchContainerComponent', () => {
  let component: VacansyMatchContainerComponent;
  let fixture: ComponentFixture<VacansyMatchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacansyMatchContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacansyMatchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
