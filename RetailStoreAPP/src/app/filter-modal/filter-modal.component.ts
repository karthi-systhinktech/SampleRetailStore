import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriesModel } from '../services/categories-model.model';
import { CategoryService } from '../services/categories.service';
import { FilterModal } from '../services/filter-model.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {

  @Output() returnData = new EventEmitter<Object>();

  public sliderValue: number;
  public changedProductName: string;
  public changedProductDescription: string;
  public minGrossPrice:number;
  public maxGrossPrice:number;
  public minAvailableQuantity:number;
  public maxAvailableQuantity:number;
  public dummy: FilterModal[] = [];
  public Categories: FilterModal[] = [];
  public dropdownList: CategoriesModel[] = [];
  public selectedItems: CategoriesModel[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm: FormGroup;

  public seletedSpecification: FilterModal;

  constructor(public modal: NgbActiveModal, public categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(result => {
      this.dropdownList = result as CategoriesModel[];
    }, error => {
      console.log("Error occured while fetching the categories");
    });

    this.dropdownSettings = {
      idField: 'id',
      textField: 'categoryName',
      selectAllText: "Select All ",
      unSelectAllText: "UnSelect All ",
      noDataAvailablePlaceholderText: "There is no item Category to show"
    };

    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
    });
  }

  productNameChanged(event:any){
    this.changedProductName=event.target.value;

  }

  productDescriptionChanged(event:any){
    this.changedProductDescription=event.target.value;

  }

  minGrossPriceValue(event:any){
    this.minGrossPrice=event.target.value;
  }

  maxGrossPriceValue(event:any){
    this.maxGrossPrice=event.target.value;
  }

  minAvailableQuantityValue(event:any){
    this.minAvailableQuantity=event.target.value;
  }

  maxAvailableQuantityValue(event:any){
    this.maxAvailableQuantity=event.target.value;
  }



  onItemSelect(item: any) {
    this.Categories.push(item);
  }
  onItemDeSelect(item: any) {
    for (var i = 0; i < this.Categories.length; i++) {
      if (this.Categories[i].id == item.id) {
        this.Categories.splice(i, 1);
      }
    }
  }
  onSelectAll(items: any) {
    for (var i = 0; i < items.length; i++) {
      this.Categories.push(items[i])
    }
  }
  onUnSelectAll() {
    this.Categories = [];
  }

  valueChanged(event: any) {
    this.sliderValue = event.target.value;
  }

  confirm() {
    // this.seletedSpecification = {} as FilterModal;
    // this.seletedSpecification.discountRange = this.sliderValue;
    // this.seletedSpecification.productName = this.changedProductName;
    // this.seletedSpecification.productDescription = this.changedProductDescription;
    // console.log(this.seletedSpecification);

    if(this.sliderValue!=undefined){
      if(this.sliderValue!=0)
         this.Categories.push({id:0,discountRange:this.sliderValue,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:-1,maxGrossPriceValue:-1,minAvailableQuantityValue:-1,maxAvailableQuantityValue:-1})
    }
    if(this.changedProductName!=undefined){
      if(this.changedProductName!="")
         this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:this.changedProductName,productDescription:"",minGrossPriceValue:-1,maxGrossPriceValue:-1,minAvailableQuantityValue:-1,maxAvailableQuantityValue:-1})
    }
    if(this.changedProductDescription!=undefined){
      if(this.changedProductDescription!="")
         this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:this.changedProductDescription,minGrossPriceValue:-1,maxGrossPriceValue:-1,minAvailableQuantityValue:-1,maxAvailableQuantityValue:-1})
    }
    if(this.minGrossPrice!=undefined&&this.maxGrossPrice!=undefined){
       this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:this.minGrossPrice,maxGrossPriceValue:this.maxGrossPrice,minAvailableQuantityValue:-1,maxAvailableQuantityValue:-1})
    }else if(this.minGrossPrice!=undefined){
      this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:this.minGrossPrice,maxGrossPriceValue:-1,minAvailableQuantityValue:-1,maxAvailableQuantityValue:-1})
    }else if(this.maxGrossPrice!=undefined){
      this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:-1,maxGrossPriceValue:this.maxGrossPrice,minAvailableQuantityValue:-1,maxAvailableQuantityValue:-1})
    }

    if(this.minAvailableQuantity!=undefined&&this.maxAvailableQuantity!=undefined){
      this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:-1,maxGrossPriceValue:-1,minAvailableQuantityValue:this.minAvailableQuantity,maxAvailableQuantityValue:this.maxAvailableQuantity})
   }else if(this.minAvailableQuantity!=undefined){
     this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:-1,maxGrossPriceValue:-1,minAvailableQuantityValue:this.minAvailableQuantity,maxAvailableQuantityValue:-1})
   }else if(this.maxAvailableQuantity!=undefined){
     this.Categories.push({id:0,discountRange:-1,categoryDescription:"",categoryName:"",isEnabled:false,productName:"",productDescription:"",minGrossPriceValue:-1,maxGrossPriceValue:-1,minAvailableQuantityValue:-1,maxAvailableQuantityValue:this.maxAvailableQuantity})
   }


     this.returnData.emit(this.Categories);

    this.modal.close();
  }

  dismiss() {
    this.modal.close();
  }

}
