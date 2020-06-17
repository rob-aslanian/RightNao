import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioBoxesComponent } from './portfolio-boxes.component';

describe('PortfolioBoxesComponent', () => {
  let component: PortfolioBoxesComponent;
  let fixture: ComponentFixture<PortfolioBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
