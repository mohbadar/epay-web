import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpDocumentComponent } from './follow-up-document.component';

describe('FollowUPComponent', () => {
  let component: FollowUpDocumentComponent;
  let fixture: ComponentFixture<FollowUpDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
