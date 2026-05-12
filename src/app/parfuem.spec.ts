import { TestBed } from '@angular/core/testing';

import { Parfuem } from './parfuem';

describe('Parfuem', () => {
  let service: Parfuem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parfuem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
