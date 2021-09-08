import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreshnaPaymentComponent } from './breshna-payment.component';

describe('BreshnaPaymentComponent', () => {
  let component: BreshnaPaymentComponent;
  let fixture: ComponentFixture<BreshnaPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreshnaPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreshnaPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
