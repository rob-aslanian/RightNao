import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpGeneralComponent } from './help-general.component';

describe('HelpGeneralComponent', () => {
  let component: HelpGeneralComponent;
  let fixture: ComponentFixture<HelpGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
