import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacansyMatchComponent } from './vacansy-match.component';

describe('VacansyMatchComponent', () => {
  let component: VacansyMatchComponent;
  let fixture: ComponentFixture<VacansyMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacansyMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacansyMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
