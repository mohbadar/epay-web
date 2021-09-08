import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditCrimeComponent} from './edit-crime.component';

describe('EditCrimeComponent', () => {
  let component: EditCrimeComponent;
  let fixture: ComponentFixture<EditCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
