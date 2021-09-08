import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDocumentComponent } from './comment-document.component';

describe('CommentDocumentComponent', () => {
  let component: CommentDocumentComponent;
  let fixture: ComponentFixture<CommentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
