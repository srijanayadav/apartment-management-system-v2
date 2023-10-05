import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUnitDialogComponent } from './save-unit-dialog.component';

describe('SaveUnitDialogComponent', () => {
  let component: SaveUnitDialogComponent;
  let fixture: ComponentFixture<SaveUnitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveUnitDialogComponent]
    });
    fixture = TestBed.createComponent(SaveUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
