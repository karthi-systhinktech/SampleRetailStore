import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './user/user.component';

const routes:Routes =[
  {path: '', component :CategoriesComponent},
  {path : 'products', component:ProductsComponent},
  {path:'login', component:LoginComponent},
  {path:'user',component:UserComponent}
]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
