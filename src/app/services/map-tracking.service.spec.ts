import { TestBed } from '@angular/core/testing';

import { MapTrackingService } from './map-tracking.service';

describe('MapTrackingService', () => {
  let service: MapTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
