import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnShareModalComponent } from './earn-share-modal.component';

describe('EarnShareModalComponent', () => {
  let component: EarnShareModalComponent;
  let fixture: ComponentFixture<EarnShareModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnShareModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
