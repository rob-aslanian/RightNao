import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsTechnologiesComponent } from './tools-technologies.component';

describe('ToolsTechnologiesComponent', () => {
  let component: ToolsTechnologiesComponent;
  let fixture: ComponentFixture<ToolsTechnologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsTechnologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
