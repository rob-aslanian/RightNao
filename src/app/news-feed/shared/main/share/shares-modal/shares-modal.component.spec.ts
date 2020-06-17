import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesModalComponent } from './shares-modal.component';

describe('SharesModalComponent', () => {
  let component: SharesModalComponent;
  let fixture: ComponentFixture<SharesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
