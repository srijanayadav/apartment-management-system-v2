import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUnitDialogComponent } from './update-unit-dialog.component';

describe('UpdateUnitDialogComponent', () => {
  let component: UpdateUnitDialogComponent;
  let fixture: ComponentFixture<UpdateUnitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUnitDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
