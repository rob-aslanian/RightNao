import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToModalComponent } from './share-to-modal.component';

describe('ShareToModalComponent', () => {
  let component: ShareToModalComponent;
  let fixture: ComponentFixture<ShareToModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareToModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
