import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditHonoraryComponent} from './edit-honorary.component';

describe('EditHonoraryComponent', () => {
  let component: EditHonoraryComponent;
  let fixture: ComponentFixture<EditHonoraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHonoraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHonoraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
