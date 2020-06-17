import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusinessBoxComponent } from './my-business-box.component';

describe('MyBusinessBoxComponent', () => {
  let component: MyBusinessBoxComponent;
  let fixture: ComponentFixture<MyBusinessBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusinessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
