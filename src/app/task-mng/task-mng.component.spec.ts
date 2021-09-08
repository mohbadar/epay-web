import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMngComponent } from './task-mng.component';

describe('TaskMngComponent', () => {
  let component: TaskMngComponent;
  let fixture: ComponentFixture<TaskMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
