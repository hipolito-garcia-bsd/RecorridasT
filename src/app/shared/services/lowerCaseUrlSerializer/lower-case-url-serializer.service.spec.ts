import { TestBed } from '@angular/core/testing';

import { LowerCaseUrlSerializerService } from './lower-case-url-serializer.service';

describe('LowerCaseUrlSerializerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LowerCaseUrlSerializerService = TestBed.get(LowerCaseUrlSerializerService);
    expect(service).toBeTruthy();
  });
});
