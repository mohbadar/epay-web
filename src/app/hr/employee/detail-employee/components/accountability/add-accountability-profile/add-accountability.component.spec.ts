import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddAccountablityComponent} from './add-accountability.component';

describe('AddAccountablityComponent', () => {
  let component: AddAccountablityComponent;
  let fixture: ComponentFixture<AddAccountablityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountablityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
