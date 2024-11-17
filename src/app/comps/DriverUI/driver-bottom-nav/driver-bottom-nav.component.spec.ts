import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBottomNavComponent } from './driver-bottom-nav.component';

describe('DriverBottomNavComponent', () => {
  let component: DriverBottomNavComponent;
  let fixture: ComponentFixture<DriverBottomNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverBottomNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverBottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
