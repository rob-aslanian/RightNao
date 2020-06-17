import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateLandingHeaderComponent } from './estate-landing-header.component';

describe('EstateLandingHeaderComponent', () => {
  let component: EstateLandingHeaderComponent;
  let fixture: ComponentFixture<EstateLandingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateLandingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateLandingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
