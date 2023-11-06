import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAttendenceComponent } from './display-attendence.component';

describe('DisplayAttendenceComponent', () => {
  let component: DisplayAttendenceComponent;
  let fixture: ComponentFixture<DisplayAttendenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayAttendenceComponent]
    });
    fixture = TestBed.createComponent(DisplayAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
