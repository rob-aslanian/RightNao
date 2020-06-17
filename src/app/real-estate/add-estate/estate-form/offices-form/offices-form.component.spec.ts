import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesFormComponent } from './offices-form.component';

describe('OfficesFormComponent', () => {
  let component: OfficesFormComponent;
  let fixture: ComponentFixture<OfficesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
