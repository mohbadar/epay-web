import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFollowupDocumentComponent } from './list-followup-document.component';

describe('ListFollowupDocumentComponent', () => {
  let component: ListFollowupDocumentComponent;
  let fixture: ComponentFixture<ListFollowupDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFollowupDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFollowupDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
