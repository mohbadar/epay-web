import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableDocumentComponent } from './receivable-document.component';

describe('ReceivableDocumentComponent', () => {
  let component: ReceivableDocumentComponent;
  let fixture: ComponentFixture<ReceivableDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivableDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
