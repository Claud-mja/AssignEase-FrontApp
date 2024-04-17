/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatiereService } from './matiere.service';

describe('Service: Matiere', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatiereService]
    });
  });

  it('should ...', inject([MatiereService], (service: MatiereService) => {
    expect(service).toBeTruthy();
  }));
});
