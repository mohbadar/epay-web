import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditFiredComponent} from './edit-fired.component';

describe('EditFiredComponent', () => {
  let component: EditFiredComponent;
  let fixture: ComponentFixture<EditFiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
