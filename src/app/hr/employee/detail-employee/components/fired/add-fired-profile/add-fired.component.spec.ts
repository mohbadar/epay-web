import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddFiredComponent} from './add-fired.component';

describe('AddFiredComponent', () => {
  let component: AddFiredComponent;
  let fixture: ComponentFixture<AddFiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
