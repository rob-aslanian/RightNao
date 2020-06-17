import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePopupComponent } from './more-popup.component';

describe('MorePopupComponent', () => {
  let component: MorePopupComponent;
  let fixture: ComponentFixture<MorePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
