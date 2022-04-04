import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';
import { Product } from '@core/models/product.model';

import { environment } from '@environments/environment';

describe('ProductsService', () => {

  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    productsService = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });


  describe('should return products array', () => {

    it('should be created', () => {
      // arrange
      const expectData: Array<Product> = [
        {
          _id: '1',
          name: 'prueba',
          price: 1212,
          description: 'producto de prueba',
          image: 'img/img/jpg'
        },
        {
          _id: '2',
          name: 'prueba2',
          price: 1212,
          description: 'producto de prueba2',
          image: 'img/img/jpg'
        }
      ];

      let dataError, dataResponse;
      // act
      productsService.getAllProducts().subscribe(response => {
        dataResponse = response;
      }, error => {
        dataError = error;
      });

      const request = httpTestingController.expectOne(`${environment.url_api}/products`);
      request.flush(expectData);

      // assets
      expect(dataResponse.length).toEqual(2);
      expect(request.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });
});
