import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskboardMemberComponent } from './add-taskboard-member.component';

describe('AddTaskboardMemberComponent', () => {
  let component: AddTaskboardMemberComponent;
  let fixture: ComponentFixture<AddTaskboardMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskboardMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskboardMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
