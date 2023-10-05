import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDetailDialogComponent } from './update-user-detail-dialog.component';

describe('UpdateUserDetailDialogComponent', () => {
  let component: UpdateUserDetailDialogComponent;
  let fixture: ComponentFixture<UpdateUserDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserDetailDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateUserDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
