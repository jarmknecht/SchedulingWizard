import { TestBed } from '@angular/core/testing';

import { MakeSchedulesService } from './make-schedules.service';

describe('MakeSchedulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MakeSchedulesService = TestBed.get(MakeSchedulesService);
    expect(service).toBeTruthy();
  });
});
