import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTableComponent } from './class-table.component';

describe('ClassTableComponent', () => {
  let component: ClassTableComponent;
  let fixture: ComponentFixture<ClassTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
