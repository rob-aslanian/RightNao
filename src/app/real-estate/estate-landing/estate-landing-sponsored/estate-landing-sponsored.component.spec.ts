import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateLandingSponsoredComponent } from './estate-landing-sponsored.component';

describe('EstateLandingSponsoredComponent', () => {
  let component: EstateLandingSponsoredComponent;
  let fixture: ComponentFixture<EstateLandingSponsoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateLandingSponsoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateLandingSponsoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
