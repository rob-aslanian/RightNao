import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProfileComponent } from './empty-profile.component';

describe('EmptyProfileComponent', () => {
  let component: EmptyProfileComponent;
  let fixture: ComponentFixture<EmptyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
