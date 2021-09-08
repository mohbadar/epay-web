import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyCommentComponent } from './list-my-comment.component';

describe('ListMyCommentComponent', () => {
  let component: ListMyCommentComponent;
  let fixture: ComponentFixture<ListMyCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
