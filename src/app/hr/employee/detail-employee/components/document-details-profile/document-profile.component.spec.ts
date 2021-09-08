import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentProfileComponent } from './document-profile.component';

describe('DocumentProfileComponent', () => {
  let component: DocumentProfileComponent;
  let fixture: ComponentFixture<DocumentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
