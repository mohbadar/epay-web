import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskAssigneeComponent } from './add-task-assignee.component';

describe('AddTaskAssigneeComponent', () => {
  let component: AddTaskAssigneeComponent;
  let fixture: ComponentFixture<AddTaskAssigneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskAssigneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
