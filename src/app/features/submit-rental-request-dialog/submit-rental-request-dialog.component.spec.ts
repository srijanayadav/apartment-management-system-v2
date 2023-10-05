import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRentalRequestDialogComponent } from './submit-rental-request-dialog.component';

describe('SubmitRentalRequestDialogComponent', () => {
  let component: SubmitRentalRequestDialogComponent;
  let fixture: ComponentFixture<SubmitRentalRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitRentalRequestDialogComponent]
    });
    fixture = TestBed.createComponent(SubmitRentalRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
