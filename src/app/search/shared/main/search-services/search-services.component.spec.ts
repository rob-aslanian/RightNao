import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServicesComponent } from './search-services.component';

describe('SearchServicesComponent', () => {
  let component: SearchServicesComponent;
  let fixture: ComponentFixture<SearchServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
