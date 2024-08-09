import { TestBed } from '@angular/core/testing';

import { FireToastService } from './fire-toast.service';

describe('FireToastService', () => {
  let service: FireToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
