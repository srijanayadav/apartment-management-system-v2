import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOwnerDialogComponent } from './save-owner-dialog.component';

describe('SaveOwnerDialogComponent', () => {
  let component: SaveOwnerDialogComponent;
  let fixture: ComponentFixture<SaveOwnerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveOwnerDialogComponent]
    });
    fixture = TestBed.createComponent(SaveOwnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
