import { TestBed } from '@angular/core/testing';

import { GetGeolocationService } from './get-geolocation.service';

describe('GetGeolocationService', () => {
  let service: GetGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
