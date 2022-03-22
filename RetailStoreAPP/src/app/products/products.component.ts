import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';
import { ProductsModel } from '../services/products-model.model';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from '../services/categories-model.model';
import { CategoryService } from '../services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public id: number;
  public productName: string;
  public productDescription: string;
  public category: number
  public isEnabled: boolean;
  public grossPrice: number;
  public discount: number;
  public availableQuantity: number;
  public products: ProductsModel[];
  public productData:string='Products Management';
  public categories: CategoriesModel[];

  public navigator:string='';

  public navigationLink:string='View All Categories';


  constructor(private ngbModal:NgbModal,public productService: ProductsService,public categoryService:CategoryService) { }

  ngOnInit(): void {
    
    this.loadProductTable();
  }

  private loadProductTable(): void {
    this.productService.getProductList().subscribe(result => {
      this.products = result as ProductsModel[];

    }, error => {
      console.log("Error occured while fetching the products");
    });
  }

  private loadCategoryTable():void{
    this.categoryService.getCategoryList().subscribe(result=>{
      this.categories = result as CategoriesModel[];
    },error =>{
      console.log("Error occured while fetching the categories");
    });
  }

  editProductDetails(value: ProductsModel) {
    this.id = value.id;
    this.productName = value.productName;
    this.productDescription = value.productDescription;
    this.category = value.category;
    this.isEnabled = value.isEnabled;
    this.grossPrice = value.grossPrice;
    this.discount = value.discount;
    this.availableQuantity = value.availableQuantity;
  }

  updateRecord(form: any) {
    this.productService.editProduct(form).subscribe(
      res => {
        this.loadProductTable();
      },
      err => { console.log(err); }
    );
  }


  insertRecord(form: any) {
    this.productService.addProduct(form).subscribe(res => {
      this.loadProductTable();
    }, err => { console.log(err); }
    );
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete")) {
      this.productService.deleteProduct(id).subscribe(
        res => {
          this.loadProductTable();
        },
        err => { console.log(err); }
      );
    }
  }

 showDialog(){
  this.categoryService.getCategoryList().subscribe(result=>{
    this.categories = result as CategoriesModel[];
  },error =>{
    console.log("Error occured while fetching the categories");
  });
   
  var modalRef= this.ngbModal.open(ProductModalComponent,{size:'md',backdrop:'static'});
  modalRef.componentInstance.isAddMode =true;
  console.log(this.categories);
  modalRef.componentInstance.returnData.subscribe((result:ProductsModel)=>{
  if(result != undefined){
    this.insertRecord(result)  
  }
  else{
    console.log("operation cancelled");
  }
  });
 }

 showEditDialog(pl:any){
  var modalRef= this.ngbModal.open(ProductModalComponent,{size:'md',backdrop:'static'});
  modalRef.componentInstance.isAddMode =false;
  modalRef.componentInstance.EditProductDetail =pl;
  modalRef.componentInstance.returnData.subscribe((result:ProductsModel)=>{
    if(result != undefined){
      result.id=pl.id;
      this.updateRecord(result)  
    }
    else{
      console.log("operation cancelled");
    }
    });

 }
}
