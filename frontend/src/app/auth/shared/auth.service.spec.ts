import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

const API_URL = environment.apiUrl;

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);

    expect(service).toBeTruthy();
  });

  it('should login', () => {
      const service: AuthService = TestBed.get(AuthService);
      const backend: HttpTestingController = TestBed.get(HttpTestingController);

      service.login('test@email.com', 'p4$w004rd').subscribe(result => {
        expect(result).toEqual('Success!');
      });

      backend.expectOne({
        method: 'POST',
        url: API_URL + '/auth/login'
      }).flush('Success!');
    });
});
