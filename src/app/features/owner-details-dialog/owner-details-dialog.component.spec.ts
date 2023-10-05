import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDetailsDialogComponent } from './owner-details-dialog.component';

describe('OwnerDetailsDialogComponent', () => {
  let component: OwnerDetailsDialogComponent;
  let fixture: ComponentFixture<OwnerDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(OwnerDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
