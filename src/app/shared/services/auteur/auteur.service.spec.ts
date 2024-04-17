/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuteurService } from './auteur.service';

describe('Service: Auteur', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuteurService]
    });
  });

  it('should ...', inject([AuteurService], (service: AuteurService) => {
    expect(service).toBeTruthy();
  }));
});
