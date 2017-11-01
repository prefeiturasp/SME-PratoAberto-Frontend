import { TestBed, inject } from '@angular/core/testing';

import { SchoolsService } from './schools.service';

describe('SchoolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolsService]
    });
  });

  it('should ...', inject([SchoolsService], (service: SchoolsService) => {
    expect(service).toBeTruthy();
  }));
});
