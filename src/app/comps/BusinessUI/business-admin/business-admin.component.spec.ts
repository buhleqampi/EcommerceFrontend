import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAdminComponent } from './business-admin.component';

describe('BusinessAdminComponent', () => {
  let component: BusinessAdminComponent;
  let fixture: ComponentFixture<BusinessAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
