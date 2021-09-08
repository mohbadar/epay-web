import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDraftDocumentComponent } from './list-draft-document.component';

describe('ListDraftDocumentComponent', () => {
  let component: ListDraftDocumentComponent;
  let fixture: ComponentFixture<ListDraftDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDraftDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDraftDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
