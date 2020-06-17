import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardOverlayComponent } from './forward-overlay.component';

describe('ForwardOverlayComponent', () => {
  let component: ForwardOverlayComponent;
  let fixture: ComponentFixture<ForwardOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
