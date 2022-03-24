import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from '../services/categories-model.model';
import { CategoryService } from '../services/categories.service';
import { ProductsModel } from '../services/products-model.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @Input() isAddMode: boolean;
  @Input() EditProductDetail: ProductsModel;
  @Output() returnData = new EventEmitter<ProductsModel>();


  public productName: string = "";
  public productDescription: string = "";
  public category: string;
  public grossPrice: number;
  public discount: number;
  public availableQuantity: number;
  public categoryList: CategoriesModel[];


  constructor(public modal: NgbActiveModal, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(result => {
      this.categoryList = result as CategoriesModel[];
    }, error => {
      console.log("Error occured while fetching the categories");
    });
  }



  get title() {
    return this.isAddMode ? "Add Product" : "Edit Product";
  }

  get name() {
    return (!this.isAddMode) ? this.EditProductDetail.productName : "";
  }

  set name(name: string) {
    if (name == "")
      this.name = this.EditProductDetail.productName;
    else
      this.productName = name;
  }

  get description() {
    return (!this.isAddMode) ? this.EditProductDetail.productDescription : "";
  }

  set description(description: string) {
    if (description == "")
      this.productDescription = this.EditProductDetail.productDescription;
    else
      this.productDescription = description;
  }

  get categoryValue() {
    return (!this.isAddMode) ? this.EditProductDetail.category : "";
  }

  set categoryValue(categoryValue: string) {
    this.category=categoryValue;
  }

  get grossPriceValue() {
    return (!this.isAddMode) ? this.EditProductDetail.grossPrice : 0;
  }

  set grossPriceValue(grossPriceValue: number) {
    if (grossPriceValue == 0)
      this.grossPrice = this.EditProductDetail.grossPrice;
    else
      this.grossPrice = grossPriceValue;
  }

  get discountValue() {
    return (!this.isAddMode) ? this.EditProductDetail.discount : 0;
  }

  set discountValue(discountValue: number) {
    if (discountValue == 0)
      this.discount = this.EditProductDetail.discount;
    else
      this.discount = discountValue;
  }

  get availableQuantityValue() {
    return (!this.isAddMode) ? this.EditProductDetail.availableQuantity : 0;
  }

  set availableQuantityValue(availableQuantityValue: number) {
    if (availableQuantityValue == 0)
      this.availableQuantity = this.EditProductDetail.availableQuantity;
    else
      this.availableQuantity = availableQuantityValue;
  }


  confirm() {
    var data = {} as ProductsModel;

    if (this.productName == "")
      data.productName = this.EditProductDetail.productName;
    else
      data.productName = this.productName;
    if (this.productDescription == "")
      data.productDescription = this.EditProductDetail.productDescription;
    else
      data.productDescription = this.productDescription;
    if (this.category == "")
      data.category = this.EditProductDetail.category;
    else
      data.category = this.category;
    if (this.grossPrice == undefined)
      data.grossPrice = this.EditProductDetail.grossPrice;
    else
      data.grossPrice = this.grossPrice;
    if (this.discount == undefined)
      data.discount = this.EditProductDetail.discount;
    else
      data.discount = this.discount;
    if (this.availableQuantity == undefined)
      data.availableQuantity = this.EditProductDetail.availableQuantity;
    else
      data.availableQuantity = this.availableQuantity;

    this.returnData.emit(data);
    this.modal.close();
  }

  selected(){
    console.log(this.categoryValue)
  }

  dismiss() {
    this.returnData.emit(undefined);
    this.modal.close();
  }

}
