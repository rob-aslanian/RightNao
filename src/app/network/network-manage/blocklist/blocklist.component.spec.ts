import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklistComponent } from './blocklist.component';

describe('BlocklistComponent', () => {
  let component: BlocklistComponent;
  let fixture: ComponentFixture<BlocklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
