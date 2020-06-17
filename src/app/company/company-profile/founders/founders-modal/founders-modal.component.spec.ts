import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundersModalComponent } from './founders-modal.component';

describe('FoundersModalComponent', () => {
  let component: FoundersModalComponent;
  let fixture: ComponentFixture<FoundersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
