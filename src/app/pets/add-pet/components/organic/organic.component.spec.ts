import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicComponent } from './organic.component';

describe('OrganicComponent', () => {
  let component: OrganicComponent;
  let fixture: ComponentFixture<OrganicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
