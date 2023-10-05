import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTenantRentalRequestDialogComponent } from './submit-tenant-rental-request-dialog.component';

describe('SubmitTenantRentalRequestDialogComponent', () => {
  let component: SubmitTenantRentalRequestDialogComponent;
  let fixture: ComponentFixture<SubmitTenantRentalRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitTenantRentalRequestDialogComponent]
    });
    fixture = TestBed.createComponent(SubmitTenantRentalRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
