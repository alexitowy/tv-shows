import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let httpCtrl: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BaseService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return blogs from Http Get call.', () => {
    const params = {
      page: '1',
    };
    service.get('shows', params).subscribe({
      next: (response: any) => {
        expect(response).toBeTruthy();
        expect(response.length).toBeGreaterThan(1);
      },
    });
  });
});
