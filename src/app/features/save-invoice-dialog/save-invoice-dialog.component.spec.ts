import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveInvoiceDialogComponent } from './save-invoice-dialog.component';

describe('SaveInvoiceDialogComponent', () => {
  let component: SaveInvoiceDialogComponent;
  let fixture: ComponentFixture<SaveInvoiceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveInvoiceDialogComponent]
    });
    fixture = TestBed.createComponent(SaveInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
