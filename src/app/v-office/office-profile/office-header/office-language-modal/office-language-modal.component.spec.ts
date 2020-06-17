import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLanguageModalComponent } from './office-language-modal.component';

describe('OfficeLanguageModalComponent', () => {
  let component: OfficeLanguageModalComponent;
  let fixture: ComponentFixture<OfficeLanguageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeLanguageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeLanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
