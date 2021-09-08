import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyVisitComponent } from './list-my-visit.component';

describe('ListMyVisitComponent', () => {
  let component: ListMyVisitComponent;
  let fixture: ComponentFixture<ListMyVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
