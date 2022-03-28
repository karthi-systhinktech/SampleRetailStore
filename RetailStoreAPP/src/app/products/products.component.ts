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
import { contains } from 'sequelize/types/lib/operators';
import { keyframes } from '@angular/animations';

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


  reset(){
    this.loadProductTable(false);
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
          if (result[0].id == 0 && result[0].discountRange != -1) {
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
          } else if (result[0].id == 0 && result[0].productName != "") {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].productName).includes(result[0].productName)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }

            }

          } else if (result[0].id == 0 && result[0].productDescription != "") {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].productDescription).includes(result[0].productDescription)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }

            }
          } else if (result[0].id == 0 && result[0].minGrossPriceValue != -1 && result[0].maxGrossPriceValue != -1) {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].grossPrice >= result[0].minGrossPriceValue && this.filterList[i].grossPrice <= result[0].maxGrossPriceValue)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }
            }
          } else if (result[0].id == 0 &&result[0].minGrossPriceValue != -1) {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].grossPrice >= result[0].minGrossPriceValue)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }
            }
          } else if (result[0].id == 0 &&result[0].maxGrossPriceValue != -1) {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].grossPrice <= result[0].maxGrossPriceValue)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }

            }
          } else if (result[0].id == 0 && result[0].minAvailableQuantityValue != -1 && result[0].maxAvailableQuantityValue != -1) {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].availableQuantity >= result[0].minAvailableQuantityValue && this.filterList[i].availableQuantity <= result[0].maxAvailableQuantityValue)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }
            }
          } else if (result[0].id == 0 &&result[0].minAvailableQuantityValue != -1) {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].availableQuantity >= result[0].minAvailableQuantityValue)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }

            }
          } else if (result[0].id == 0 &&result[0].maxAvailableQuantityValue != -1) {
            for (var i = 0; i < this.filterList.length; i++) {
              if ((this.filterList[i].availableQuantity <= result[0].maxAvailableQuantityValue)) {

              } else {
                this.filterList.splice(i, 1);
                --i;
              }

            }
          } else {
            for (var i = 0; i < result.length; i++) {
              var count = 0;
              for (var j = 0; j < this.filterList.length; j++) {
                if (result[i].categoryName == this.filterList[j].category) {
                } else {
                  this.filterList.splice(j, 1);
                  --j;
                }
              }
            }
          }
        } else {
          for(var i=0;i<result.length;i++){
            if(result[i].id!=0){
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
         }
        }

          for (var k = 0; k < this.filterList.length; k++) {
            for (var x = 0; x < result.length; x++) {
              if (result[x].id == 0 && result[x].discountRange != -1) {
                if (result[x].discountRange == this.filterList[k].discount) {
                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              }
            }
          }

          for (var k = 0; k < this.filterList.length; k++) {
            for (var x = 0; x < result.length; x++) {
              if (result[x].id == 0 && result[x].productName != "") {
                if ((this.filterList[k].productName).includes(result[x].productName)) {
                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              }
            }
          }

          for (var k = 0; k < this.filterList.length; k++) {
            for (var x = 0; x < result.length; x++) {
              if (result[x].id == 0 && result[x].productDescription != "") {
                if ((this.filterList[k].productDescription).includes(result[x].productDescription)) {
                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              }
            }
          }

          for (var k = 0; k < this.filterList.length; k++) {
            for (var x = 0; x < result.length; x++) {
              if (result[x].id == 0 && result[x].minGrossPriceValue != -1 && result[x].maxGrossPriceValue != -1) {
                if ((this.filterList[k].grossPrice >= result[x].minGrossPriceValue && this.filterList[k].grossPrice <= result[x].maxGrossPriceValue)) {

                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              } else if (result[x].id == 0 && result[0].minGrossPriceValue != -1) {
                if ((this.filterList[k].grossPrice >= result[x].minGrossPriceValue)) {

                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              } else if (result[x].id == 0 && result[x].maxGrossPriceValue != -1) {
                if ((this.filterList[k].grossPrice <= result[x].maxGrossPriceValue)) {

                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              }
            }
          }

          for (var k = 0; k < this.filterList.length; k++) {
            for (var x = 0; x < result.length; x++) {
              if (result[x].id == 0 && result[x].minAvailableQuantityValue != -1 && result[x].maxAvailableQuantityValue != -1) {
                if ((this.filterList[k].availableQuantity >= result[x].minAvailableQuantityValue && this.filterList[k].availableQuantity <= result[x].maxAvailableQuantityValue)) {

                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              } else if (result[x].id == 0 && result[0].minAvailableQuantityValue != -1) {
                if ((this.filterList[k].availableQuantity >= result[x].minAvailableQuantityValue)) {

                } else {
                  this.filterList.splice(k, 1);
                  --k;
                }
              } else if (result[x].id == 0 && result[x].minAvailableQuantityValue != -1) {
                if ((this.filterList[k].availableQuantity <= result[x].maxAvailableQuantityValue)) {

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
