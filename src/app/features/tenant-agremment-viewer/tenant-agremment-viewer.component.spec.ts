import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantAgremmentViewerComponent } from './tenant-agremment-viewer.component';

describe('TenantAgremmentViewerComponent', () => {
  let component: TenantAgremmentViewerComponent;
  let fixture: ComponentFixture<TenantAgremmentViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantAgremmentViewerComponent]
    });
    fixture = TestBed.createComponent(TenantAgremmentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
