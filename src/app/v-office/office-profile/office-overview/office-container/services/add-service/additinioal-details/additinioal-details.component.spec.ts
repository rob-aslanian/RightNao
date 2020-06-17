import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditinioalDetailsComponent } from './additinioal-details.component';

describe('AdditinioalDetailsComponent', () => {
  let component: AdditinioalDetailsComponent;
  let fixture: ComponentFixture<AdditinioalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditinioalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditinioalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
