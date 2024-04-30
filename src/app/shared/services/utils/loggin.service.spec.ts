/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogginService } from './loggin.service';

describe('Service: Loggin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogginService]
    });
  });

  it('should ...', inject([LogginService], (service: LogginService) => {
    expect(service).toBeTruthy();
  }));
});
