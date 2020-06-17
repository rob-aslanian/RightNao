import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusinessComponent } from './my-business.component';

describe('MyBusinessComponent', () => {
  let component: MyBusinessComponent;
  let fixture: ComponentFixture<MyBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
