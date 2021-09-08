import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskboardComponent } from './edit-taskboard.component';

describe('EditTaskboardComponent', () => {
  let component: EditTaskboardComponent;
  let fixture: ComponentFixture<EditTaskboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
