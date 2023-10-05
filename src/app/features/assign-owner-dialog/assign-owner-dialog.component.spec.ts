import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOwnerDialogComponent } from './assign-owner-dialog.component';

describe('AssignOwnerDialogComponent', () => {
  let component: AssignOwnerDialogComponent;
  let fixture: ComponentFixture<AssignOwnerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignOwnerDialogComponent]
    });
    fixture = TestBed.createComponent(AssignOwnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
