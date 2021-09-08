import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftDocumentComponent } from './draft-document.component';

describe('DraftDocumentComponent', () => {
  let component: DraftDocumentComponent;
  let fixture: ComponentFixture<DraftDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
