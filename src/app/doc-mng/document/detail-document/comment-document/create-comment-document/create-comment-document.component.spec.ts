import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentDocumentComponent } from './create-comment-document.component';

describe('CreateCommentDocumentComponent', () => {
  let component: CreateCommentDocumentComponent;
  let fixture: ComponentFixture<CreateCommentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
