import { TestBed, inject } from '@angular/core/testing';

import { CalendaryService } from './calendary.service';

describe('CalendaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendaryService]
    });
  });

  it('should ...', inject([CalendaryService], (service: CalendaryService) => {
    expect(service).toBeTruthy();
  }));
});
