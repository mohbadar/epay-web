import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocFollowupActivityComponent } from './doc-followup-activity.component';

describe('DocFollowupActivityComponent', () => {
  let component: DocFollowupActivityComponent;
  let fixture: ComponentFixture<DocFollowupActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocFollowupActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocFollowupActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
