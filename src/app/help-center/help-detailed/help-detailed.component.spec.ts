import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDetailedComponent } from './help-detailed.component';

describe('HelpDetailedComponent', () => {
  let component: HelpDetailedComponent;
  let fixture: ComponentFixture<HelpDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
