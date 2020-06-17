import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateBoxComponent } from './estate-box.component';

describe('EstateBoxComponent', () => {
  let component: EstateBoxComponent;
  let fixture: ComponentFixture<EstateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
