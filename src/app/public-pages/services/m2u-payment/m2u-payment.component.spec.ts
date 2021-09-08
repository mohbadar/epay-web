import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { M2uPaymentComponent } from './m2u-payment.component';

describe('M2uPaymentComponent', () => {
  let component: M2uPaymentComponent;
  let fixture: ComponentFixture<M2uPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ M2uPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(M2uPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
