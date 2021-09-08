import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditJobBreakComponent} from './edit-job-break.component';

describe('EditJobBreakComponent', () => {
  let component: EditJobBreakComponent;
  let fixture: ComponentFixture<EditJobBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
