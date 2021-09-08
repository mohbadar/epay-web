import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMngComponent } from './doc-mng.component';

describe('DocMngComponent', () => {
  let component: DocMngComponent;
  let fixture: ComponentFixture<DocMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
