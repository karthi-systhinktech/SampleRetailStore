import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';
import { ProductsModel } from '../services/products-model.model';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from '../services/categories-model.model';
import { CategoryService } from '../services/categories.service';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { FilterModal } from '../services/filter-model.model';

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
  public productData: string = 'Products Management';
  public categories: CategoriesModel[];
  public filterIdList: CategoriesModel[];
  public filterList: ProductsModel[];

  public navigator: string = '';

  public navigationLink: string = 'View All Categories';


  constructor(private ngbModal: NgbModal, public productService: ProductsService, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadProductTable(false);
    console.log(this.filterList)
  }

  private loadProductTable(isLoaded: boolean): void {
    this.productService.getProductList().subscribe(result => {
      this.products = result as ProductsModel[];
      if (!isLoaded)
        this.filterList = result as ProductsModel[];
    }, error => {
      console.log("Error occured while fetching the products");
    });
  }

  editProductDetails(value: ProductsModel) {
    this.id = value.id;
    this.productName = value.productName;
    this.productDescription = value.productDescription;
    // this.category = value.category;
    this.isEnabled = value.isEnabled;
    this.grossPrice = value.grossPrice;
    this.discount = value.discount;
    this.availableQuantity = value.availableQuantity;
  }

  updateRecord(form: any) {
    this.productService.editProduct(form).subscribe(
      res => {
        this.loadProductTable(false);
      },
      err => { console.log(err); }
    );
  }


  insertRecord(form: any) {
    console.log(form)
    this.productService.addProduct(form).subscribe(res => {
      this.loadProductTable(false);
    }, err => { console.log(err); }
    );
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete")) {
      this.productService.deleteProduct(id).subscribe(
        res => {
          this.loadProductTable(false);
        },
        err => { console.log(err); }
      );
    }
  }

  showDialog() {

    var modalRef = this.ngbModal.open(ProductModalComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.isAddMode = true;
    modalRef.componentInstance.returnData.subscribe((result: ProductsModel) => {
      if (result != undefined) {
        this.insertRecord(result)
      }
      else {
        console.log("operation cancelled");
      }
    });
  }

  showEditDialog(pl: any) {
    var modalRef = this.ngbModal.open(ProductModalComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.isAddMode = false;
    modalRef.componentInstance.EditProductDetail = pl;
    modalRef.componentInstance.returnData.subscribe((result: ProductsModel) => {
      if (result != undefined) {
        result.id = pl.id;
        this.updateRecord(result)
      }
      else {
        console.log("operation cancelled");
      }
    });
  }

  showFilterDialog() {

    var modalRef = this.ngbModal.open(FilterModalComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.returnData.subscribe((result: Array<FilterModal>) => {
      this.loadProductTable(true)
      this.filterList = this.products;

      if (result != undefined) {
        if (result.length == 0) {
          this.filterList = this.products;
        } else if (result.length == 1) {
          if (result[0].id == 0) {
            for (var k = 0; k < this.filterList.length; k++) {
              for (var x = 0; x < result.length; x++) {
                if (result[x].id == 0) {
                  if (result[x].discountRange == this.filterList[k].discount) {

                  } else {
                    this.filterList.splice(k, 1);
                    --k;
                  }
                }
              }
            }
          } else {
            for (var i = 0; i < result.length; i++) {
              var count = 0;
              for (var j = 0; j < this.filterList.length; j++) {
                if (result[i].categoryName== this.filterList[j].category) {
                } else {
                  this.filterList.splice(j, 1);
                  --j;
                }
              }
            }
          }
        } else {
          for (var i = 0; i < this.filterList.length; i++) {
            var count = 0;
            for (var j = 0; j < result.length; j++) {
              if (result[j].categoryName == this.filterList[i].category) {
                count++;
              }
            }

            if (count == 0) {
              this.filterList.splice(i, 1);
              --i;
            }
          }
          for (var k = 0; k < this.filterList.length; k++) {
            for (var x = 0; x < result.length; x++) {
              if (result[x].id == 0) {
                if (result[x].discountRange == this.filterList[k].discount) {

                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              }
            }
          }
        }
      }
      else {
        console.log("operation cancelled succesfully");
      }
    });
  }
}
