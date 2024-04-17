/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfesseurService } from './professeur.service';

describe('Service: Professeur', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfesseurService]
    });
  });

  it('should ...', inject([ProfesseurService], (service: ProfesseurService) => {
    expect(service).toBeTruthy();
  }));
});
