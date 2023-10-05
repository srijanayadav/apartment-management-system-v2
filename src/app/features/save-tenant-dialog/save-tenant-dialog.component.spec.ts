import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTenantDialogComponent } from './save-tenant-dialog.component';

describe('SaveTenantDialogComponent', () => {
  let component: SaveTenantDialogComponent;
  let fixture: ComponentFixture<SaveTenantDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveTenantDialogComponent]
    });
    fixture = TestBed.createComponent(SaveTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
