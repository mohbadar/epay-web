import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskExecutionComponent } from './add-task-execution.component';

describe('AddTaskExecutionComponent', () => {
  let component: AddTaskExecutionComponent;
  let fixture: ComponentFixture<AddTaskExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
