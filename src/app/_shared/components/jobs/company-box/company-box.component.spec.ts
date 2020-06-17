import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBoxComponent } from './company-box.component';

describe('CompanyBoxComponent', () => {
  let component: CompanyBoxComponent;
  let fixture: ComponentFixture<CompanyBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
