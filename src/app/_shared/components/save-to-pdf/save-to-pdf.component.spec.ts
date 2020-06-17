import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveToPDFComponent } from './save-to-pdf.component';

describe('SaveToPDFComponent', () => {
  let component: SaveToPDFComponent;
  let fixture: ComponentFixture<SaveToPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveToPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveToPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
