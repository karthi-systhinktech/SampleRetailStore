import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesModel } from './categories-model.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly controller:string="/Categories";

  constructor(private http:HttpClient) { }

  addCategory(category:CategoriesModel):Observable<string>{
    const headers = { 'content-type': 'application/json',}  

    const body=JSON.stringify(category);
    return this.http.post<string>(environment.apiUrl+this.controller+"/addCategories",body,{ headers, responseType: 'text' as 'json'  });
  }
 
  getCategoryList():Observable<object>{
    return this.http.get(environment.apiUrl+this.controller+"/All");
  }

  deleteCategory(id:number){
    return this.http.delete(environment.apiUrl+this.controller+"/"+id,{responseType:'text'});
  }

  editCategoryItem(form:CategoriesModel):Observable<string>{
    const headers = { 'content-type': 'application/json',}  
    const body=JSON.stringify(form);

    return this.http.put<string>(environment.apiUrl+this.controller+"/editCategory",body,{ headers , responseType: 'text' as 'json'});
  }
}
