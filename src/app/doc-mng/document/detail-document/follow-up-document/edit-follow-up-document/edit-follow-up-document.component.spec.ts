import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFollowUpDocumentComponent } from './edit-follow-up-document.component';

describe('EditFollowUpComponent', () => {
  let component: EditFollowUpDocumentComponent;
  let fixture: ComponentFixture<EditFollowUpDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFollowUpDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFollowUpDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
