import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddJobBreakComponent} from './add-job-break.component';

describe('AddJobBreakComponent', () => {
  let component: AddJobBreakComponent;
  let fixture: ComponentFixture<AddJobBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
