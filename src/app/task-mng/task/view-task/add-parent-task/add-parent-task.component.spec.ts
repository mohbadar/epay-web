import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentTaskComponent } from './add-parent-task.component';

describe('AddParentTaskComponent', () => {
  let component: AddParentTaskComponent;
  let fixture: ComponentFixture<AddParentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
