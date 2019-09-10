import { TestBed } from '@angular/core/testing';

import { AnularService } from './anular.service';

describe('AnularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnularService = TestBed.get(AnularService);
    expect(service).toBeTruthy();
  });
});
