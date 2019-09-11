import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/products';
  }

  public getProduct(): Observable<Array<IProducts>>{
    return this.http.get<Array<IProducts>>(this.url);
  }

  public addProduct(obj: IProducts): Observable<Array<IProducts>>{
    return this.http.post<Array<IProducts>>(this.url, obj); 
  }

  public deleteProducts(id: number): Observable<Array<IProducts>>{
    return this.http.delete<Array<IProducts>>(`${this.url}/${id}`);
  }

  public editProducts(obj: IProducts): Observable<Array<IProducts>>{
    return this.http.put<Array<IProducts>>(`${this.url}/${obj.id}`, obj);
  }

  public getOneProduct(id: number): Observable<IProducts>{
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }
}
