import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsServiceComponent } from './pets-service.component';

describe('PetsServiceComponent', () => {
  let component: PetsServiceComponent;
  let fixture: ComponentFixture<PetsServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
