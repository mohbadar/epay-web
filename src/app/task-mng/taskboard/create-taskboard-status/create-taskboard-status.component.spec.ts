import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskboardStatusComponent } from './create-taskboard-status.component';

describe('CreateTaskboardStatusComponent', () => {
  let component: CreateTaskboardStatusComponent;
  let fixture: ComponentFixture<CreateTaskboardStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskboardStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskboardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
