import { TestBed } from '@angular/core/testing';

import { CargarService } from './cargar.service';

describe('CargarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargarService = TestBed.get(CargarService);
    expect(service).toBeTruthy();
  });
});
