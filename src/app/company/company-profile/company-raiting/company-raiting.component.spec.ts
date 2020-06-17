import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRaitingComponent } from './company-raiting.component';

describe('CompanyRaitingComponent', () => {
  let component: CompanyRaitingComponent;
  let fixture: ComponentFixture<CompanyRaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
