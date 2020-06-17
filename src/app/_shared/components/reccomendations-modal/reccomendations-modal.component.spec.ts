import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccomendationsModalComponent } from './reccomendations-modal.component';

describe('ReccomendationsModalComponent', () => {
  let component: ReccomendationsModalComponent;
  let fixture: ComponentFixture<ReccomendationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReccomendationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReccomendationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
