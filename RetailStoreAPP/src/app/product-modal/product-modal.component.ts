import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesModel } from '../services/categories-model.model';
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
  public category:number;
  public grossPrice:number;
  public discount:number;
  public availableQuantity:number;
   public categoryList:CategoriesModel[];


  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  get title() {
    return this.isAddMode ? "Add Product" : "Edit Product";
  }

  get name() {
    console.log("111")
    console.log(this.categoryList)
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

  get categoryValue(){
    return (!this.isAddMode) ? this.EditProductDetail.category : 0;
  }

  set categoryValue(categoryValue: number){
    if (categoryValue == 0)
      this.category = this.EditProductDetail.category;
    else
      this.category = categoryValue;
  }

  get grossPriceValue(){
    return (!this.isAddMode) ? this.EditProductDetail.grossPrice : 0;
  }

  set grossPriceValue(grossPriceValue: number){
    if (grossPriceValue == 0)
    this.grossPrice = this.EditProductDetail.grossPrice;
  else
    this.grossPrice = grossPriceValue;
  }

  get discountValue(){
    return (!this.isAddMode) ? this.EditProductDetail.discount : 0;
  }

  set discountValue(discountValue: number){
    if (discountValue == 0)
    this.discount = this.EditProductDetail.discount;
  else
    this.discount = discountValue;
  }

  get availableQuantityValue(){
    return (!this.isAddMode) ? this.EditProductDetail.availableQuantity : 0;
  }

  set availableQuantityValue(availableQuantityValue: number){
    if (availableQuantityValue == 0)
    this.availableQuantity = this.EditProductDetail.availableQuantity;
  else
    this.availableQuantity = availableQuantityValue;
  }


  confirm() {
    var data = {} as ProductsModel;
    data.productDescription = this.productDescription;
    data.productName = this.productName;
    data.category=this.category;
    data.grossPrice=this.grossPrice;
    data.discount=this.discount;
    data.availableQuantity=this.availableQuantity;

    this.returnData.emit(data);
    this.modal.close();
  }

  dismiss() {
    this.returnData.emit(undefined);
    this.modal.close();
  }

}
