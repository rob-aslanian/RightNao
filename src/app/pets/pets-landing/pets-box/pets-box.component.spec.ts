import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsBoxComponent } from './pets-box.component';

describe('PetsBoxComponent', () => {
  let component: PetsBoxComponent;
  let fixture: ComponentFixture<PetsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
