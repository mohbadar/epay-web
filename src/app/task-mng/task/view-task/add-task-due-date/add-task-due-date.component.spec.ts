import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDueDateComponent } from './add-task-due-date.component';

describe('AddTaskDueDateComponent', () => {
  let component: AddTaskDueDateComponent;
  let fixture: ComponentFixture<AddTaskDueDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskDueDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
