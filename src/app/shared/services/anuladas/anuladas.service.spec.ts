import { TestBed } from '@angular/core/testing';

import { AnuladasService } from './anuladas.service';

describe('AnuladasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnuladasService = TestBed.get(AnuladasService);
    expect(service).toBeTruthy();
  });
});
