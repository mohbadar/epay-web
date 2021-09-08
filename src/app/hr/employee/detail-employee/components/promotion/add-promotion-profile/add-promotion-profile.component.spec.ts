import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddPromotionProfileComponent} from './add-promotion-profile.component';

describe('AddPromotionProfileComponent', () => {
  let component: AddPromotionProfileComponent;
  let fixture: ComponentFixture<AddPromotionProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotionProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
