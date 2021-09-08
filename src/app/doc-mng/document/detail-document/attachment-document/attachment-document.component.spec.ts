import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentDocumentComponent } from './attachment-document.component';

describe('AttachmentDocumentComponent', () => {
  let component: AttachmentDocumentComponent;
  let fixture: ComponentFixture<AttachmentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
