import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClosedRequestComponent } from './list-closed-request.component';

describe('ListClosedRequestComponent', () => {
  let component: ListClosedRequestComponent;
  let fixture: ComponentFixture<ListClosedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClosedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClosedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
