import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if token is not available', () => {
    service.token = null;

    expect(() => {
      service.getData('endpoint').subscribe();
    }).toThrowError('Token non disponibile');
  });

  it('should make an HTTP GET request with the correct authorization header', () => {
    const endpoint = 'endpoint';
    const responseData = [
      {
        id: 1,
        name: 'example',
        gender: 'male',
        status: 'active',
        email: 'example@info',
      },
    ];

    service.token = 'mockToken';

    service.getData(endpoint).subscribe((data) => {
      expect(data).toEqual(responseData);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.method === 'GET' &&
        request.url === `https://gorest.co.in/public/v2/${endpoint}`
      );
    });

    expect(req.request.headers.get('Authorization')).toEqual(
      'Bearer mockToken'
    );

    req.flush(responseData);

    httpTestingController.verify();
  });
});
