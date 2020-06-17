import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsAuthorComponent } from './pet-details-author.component';

describe('PetDetailsAuthorComponent', () => {
  let component: PetDetailsAuthorComponent;
  let fixture: ComponentFixture<PetDetailsAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetDetailsAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDetailsAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
