import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddCrimeComponent} from './add-crime.component';

describe('AddCrimeComponent', () => {
  let component: AddCrimeComponent;
  let fixture: ComponentFixture<AddCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
