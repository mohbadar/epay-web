import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SettingDetailsComponent} from './setting-details.component';

describe('SettingDetailsComponent', () => {
  let component: SettingDetailsComponent;
  let fixture: ComponentFixture<SettingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
