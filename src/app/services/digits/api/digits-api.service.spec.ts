import { TestBed } from '@angular/core/testing';

import { DigitsApiService } from './digits-api.service';

describe('DigitsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DigitsApiService = TestBed.get(DigitsApiService);
    expect(service).toBeTruthy();
  });
});
