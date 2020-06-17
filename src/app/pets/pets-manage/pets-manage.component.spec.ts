import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsManageComponent } from './pets-manage.component';

describe('PetsManageComponent', () => {
  let component: PetsManageComponent;
  let fixture: ComponentFixture<PetsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
