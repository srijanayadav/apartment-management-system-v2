import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUserDialogComponent } from './save-user-dialog.component';

describe('SaveUserDialogComponent', () => {
  let component: SaveUserDialogComponent;
  let fixture: ComponentFixture<SaveUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveUserDialogComponent]
    });
    fixture = TestBed.createComponent(SaveUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
