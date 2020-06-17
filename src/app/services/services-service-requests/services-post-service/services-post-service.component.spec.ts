import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPostServiceComponent } from './services-post-service.component';

describe('ServicesPostServiceComponent', () => {
  let component: ServicesPostServiceComponent;
  let fixture: ComponentFixture<ServicesPostServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesPostServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesPostServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
