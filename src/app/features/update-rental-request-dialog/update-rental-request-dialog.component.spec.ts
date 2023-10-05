import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentalRequestDialogComponent } from './update-rental-request-dialog.component';

describe('UpdateRentalRequestDialogComponent', () => {
  let component: UpdateRentalRequestDialogComponent;
  let fixture: ComponentFixture<UpdateRentalRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRentalRequestDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateRentalRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
