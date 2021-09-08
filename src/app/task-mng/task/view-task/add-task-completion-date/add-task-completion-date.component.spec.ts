import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskCompletionDateComponent } from './add-task-completion-date.component';

describe('AddTaskCompletionDateComponent', () => {
  let component: AddTaskCompletionDateComponent;
  let fixture: ComponentFixture<AddTaskCompletionDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskCompletionDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskCompletionDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
