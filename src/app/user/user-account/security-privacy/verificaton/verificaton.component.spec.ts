import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificatonComponent } from './verificaton.component';

describe('VerificatonComponent', () => {
  let component: VerificatonComponent;
  let fixture: ComponentFixture<VerificatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
