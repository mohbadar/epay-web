import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditRetirementComponent} from './edit-retirement.component';

describe('EditRetirementComponent', () => {
  let component: EditRetirementComponent;
  let fixture: ComponentFixture<EditRetirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRetirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
