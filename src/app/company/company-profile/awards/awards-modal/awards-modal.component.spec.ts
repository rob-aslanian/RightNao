import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsModalComponent } from './awards-modal.component';

describe('AwardsModalComponent', () => {
  let component: AwardsModalComponent;
  let fixture: ComponentFixture<AwardsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
