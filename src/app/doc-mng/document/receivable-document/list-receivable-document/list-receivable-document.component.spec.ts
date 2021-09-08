import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceivableDocumentComponent } from './list-receivable-document.component';

describe('ListReceivableDocumentComponent', () => {
  let component: ListReceivableDocumentComponent;
  let fixture: ComponentFixture<ListReceivableDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceivableDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivableDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
