import { TestBed } from '@angular/core/testing';

import { VitalServiceService } from './vital-service.service';

describe('VitalServiceService', () => {
  let service: VitalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
