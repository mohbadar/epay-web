import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyDocumentComponent } from './list-my-document.component';

describe('ListMyDocumentComponent', () => {
  let component: ListMyDocumentComponent;
  let fixture: ComponentFixture<ListMyDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
