import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditAccountablityComponent} from './edit-accountability.component';

describe('EditAccountablityComponent', () => {
  let component: EditAccountablityComponent;
  let fixture: ComponentFixture<EditAccountablityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountablityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
