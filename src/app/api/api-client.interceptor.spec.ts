import { TestBed } from '@angular/core/testing';

import { ApiClientInterceptor } from './api-client.interceptor';

describe('ApiClientInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiClientInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiClientInterceptor = TestBed.inject(ApiClientInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
