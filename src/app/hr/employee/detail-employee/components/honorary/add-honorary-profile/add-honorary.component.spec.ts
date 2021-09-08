import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddHonoraryComponent} from './add-honorary.component';

describe('AddHonoraryComponent', () => {
  let component: AddHonoraryComponent;
  let fixture: ComponentFixture<AddHonoraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHonoraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHonoraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
