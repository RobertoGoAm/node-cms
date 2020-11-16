import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

const API_URL = environment.apiUrl;

describe('AuthService', () => {
  let service: AuthService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    service.login('test@email.com', 'p4$w004rd').subscribe((result) => {
      expect(result).toEqual('Success!');
    });

    backend
      .expectOne({
        method: 'POST',
        url: API_URL + '/auth/login',
      })
      .flush('Success!');
  });

  it('should register', () => {
    service.register('test', 'test@email.com', 'p4$w004rd').subscribe((result) => {
      expect(result).toEqual('Success!');
    });

    backend
      .expectOne({
        method: 'POST',
        url: API_URL + '/auth/register',
      })
      .flush('Success!');
  });
});
