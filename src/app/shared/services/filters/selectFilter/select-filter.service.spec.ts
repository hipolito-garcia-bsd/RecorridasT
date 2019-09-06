import { TestBed } from '@angular/core/testing';

import { SelectFilterService } from './select-filter.service';

describe('SelectFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectFilterService = TestBed.get(SelectFilterService);
    expect(service).toBeTruthy();
  });
});
