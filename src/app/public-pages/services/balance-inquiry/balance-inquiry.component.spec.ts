import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInquiryComponent } from './balance-inquiry.component';

describe('BalanceInquiryComponent', () => {
  let component: BalanceInquiryComponent;
  let fixture: ComponentFixture<BalanceInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
