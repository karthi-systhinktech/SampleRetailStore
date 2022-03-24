import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsModel } from './products-model.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly controller:string="/Products";

  constructor(private http:HttpClient) { }

  getProductList(){
    return this.http.get(environment.apiUrl+this.controller+"/All");
  }

  addProduct(product:ProductsModel):Observable<string>{
    const headers = { 'content-type': 'application/json',}  

    const body=JSON.stringify(product);
    return this.http.post<string>(environment.apiUrl+this.controller+"/addProduct",body,{ headers, responseType: 'text' as 'json'  });
  }

  deleteProduct(id:number){
    return this.http.delete(environment.apiUrl+this.controller+"/"+id,{responseType:'text'});
  }

  getProductByCategoryName(categoryId:Object[]){
    return this.http.get(environment.apiUrl+this.controller+"/getProductsByCategoryName/"+categoryId);
  }

  editProduct(form:ProductsModel):Observable<string>{
    const headers = { 'content-type': 'application/json',}  
    const body=JSON.stringify(form);

    return this.http.put<string>(environment.apiUrl+this.controller+"/editProduct",body,{ headers , responseType: 'text' as 'json'});
  }
}
