import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessprofileComponent } from './businessprofile.component';

describe('BusinessprofileComponent', () => {
  let component: BusinessprofileComponent;
  let fixture: ComponentFixture<BusinessprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
