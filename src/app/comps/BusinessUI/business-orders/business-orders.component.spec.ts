import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOrdersComponent } from './business-orders.component';

describe('CusOrdersComponent', () => {
  let component: BusinessOrdersComponent;
  let fixture: ComponentFixture<BusinessOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
