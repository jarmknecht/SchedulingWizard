import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeWeekComponent } from './large-week.component';

describe('LargeWeekComponent', () => {
  let component: LargeWeekComponent;
  let fixture: ComponentFixture<LargeWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
