import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundersComponent } from './founders.component';

describe('FoundersComponent', () => {
  let component: FoundersComponent;
  let fixture: ComponentFixture<FoundersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
