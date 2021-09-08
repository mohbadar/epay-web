import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskAttachmentComponent } from './add-task-attachment.component';

describe('AddTaskAttachmentComponent', () => {
  let component: AddTaskAttachmentComponent;
  let fixture: ComponentFixture<AddTaskAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
