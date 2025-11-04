import { TestBed } from '@angular/core/testing';

import { ToastrClientService } from './toastr-client.service';

describe('ToastrClientService', () => {
  let service: ToastrClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
