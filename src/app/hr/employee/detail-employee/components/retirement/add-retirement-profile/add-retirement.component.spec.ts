import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddRetirementComponent} from './add-retirement.component';

describe('AddRetirementComponent', () => {
  let component: AddRetirementComponent;
  let fixture: ComponentFixture<AddRetirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRetirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
