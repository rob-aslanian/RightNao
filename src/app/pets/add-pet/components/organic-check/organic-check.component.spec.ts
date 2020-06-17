import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicCheckComponent } from './organic-check.component';

describe('OrganicCheckComponent', () => {
  let component: OrganicCheckComponent;
  let fixture: ComponentFixture<OrganicCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
