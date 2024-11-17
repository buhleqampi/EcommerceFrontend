import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneOrderComponent } from './view-one-order.component';

describe('ViewOneOrderComponent', () => {
  let component: ViewOneOrderComponent;
  let fixture: ComponentFixture<ViewOneOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOneOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOneOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
