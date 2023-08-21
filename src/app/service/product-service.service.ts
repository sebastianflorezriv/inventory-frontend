import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductBody } from '../model/product-body';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlApi: string = 'http://localhost:8080/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.urlApi);
  }

  public getOneProduct(idProduct: number): Observable<Product> {
    return this.httpClient.get<Product>(this.urlApi + `/${idProduct}`);
  }

  public createProduct(newProduct: ProductBody): Observable<Product> {
    return this.httpClient.post<Product>(this.urlApi, newProduct);
  }

  public updateProduct(
    updatedProduct: ProductBody,
    idProduct: number
  ): Observable<Product> {
    return this.httpClient.put<Product>(
      this.urlApi + `/${idProduct}`,
      updatedProduct
    );
  }

  public deleteProduct(idProduct: number): Observable<number> {
    return this.httpClient.delete<number>(this.urlApi + `/${idProduct}`);
  }
}
