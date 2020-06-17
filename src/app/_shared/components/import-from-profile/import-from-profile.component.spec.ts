import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFromProfileComponent } from './import-from-profile.component';

describe('ImportFromProfileComponent', () => {
  let component: ImportFromProfileComponent;
  let fixture: ComponentFixture<ImportFromProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportFromProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFromProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
