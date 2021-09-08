import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyFollowupComponent } from './list-my-followup.component';

describe('ListMyFollowupComponent', () => {
  let component: ListMyFollowupComponent;
  let fixture: ComponentFixture<ListMyFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyFollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
