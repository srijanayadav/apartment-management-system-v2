import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDetailsDialogComponent } from './unit-details-dialog.component';

describe('UnitDetailsDialogComponent', () => {
  let component: UnitDetailsDialogComponent;
  let fixture: ComponentFixture<UnitDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(UnitDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
