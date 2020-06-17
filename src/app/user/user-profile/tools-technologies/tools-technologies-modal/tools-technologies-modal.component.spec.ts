import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsTechnologiesModalComponent } from './tools-technologies-modal.component';

describe('ToolsTechnologiesModalComponent', () => {
  let component: ToolsTechnologiesModalComponent;
  let fixture: ComponentFixture<ToolsTechnologiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsTechnologiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsTechnologiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
