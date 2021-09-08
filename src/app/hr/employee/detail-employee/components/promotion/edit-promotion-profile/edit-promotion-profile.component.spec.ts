import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditPromotionProfileComponent} from './edit-promotion-profile.component';

describe('EditPromotionProfileComponent', () => {
  let component: EditPromotionProfileComponent;
  let fixture: ComponentFixture<EditPromotionProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPromotionProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromotionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
