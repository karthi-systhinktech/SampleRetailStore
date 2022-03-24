import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    LoginComponent,
    UserComponent,
    NavbarComponent,
    ModalComponent,
    ProductModalComponent,
    FilterModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
