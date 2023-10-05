import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageHeaderComponent } from './detail-page-header.component';

describe('DetailPageHeaderComponent', () => {
  let component: DetailPageHeaderComponent;
  let fixture: ComponentFixture<DetailPageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPageHeaderComponent]
    });
    fixture = TestBed.createComponent(DetailPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
