import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTrackComponent } from './driver-track.component';

describe('DriverTrackComponent', () => {
  let component: DriverTrackComponent;
  let fixture: ComponentFixture<DriverTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
