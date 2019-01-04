import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniWeekComponent } from './mini-week.component';

describe('MiniWeekComponent', () => {
  let component: MiniWeekComponent;
  let fixture: ComponentFixture<MiniWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
