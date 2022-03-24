import { EventEmitter, Input, Output } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Optional } from "@angular/core";
import { NgbActiveModal, NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesModel } from "../services/categories-model.model";
import { CategoryService } from "../services/categories.service";


@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
})



export class ModalComponent {

  @Input() isAddMode: boolean;
  @Input() EditCategoryDetail: CategoriesModel;
  @Output() returnData = new EventEmitter<CategoriesModel>();


  public categoryName: string = "";
  public categoryDescription: string = "";
  public categoryList:CategoriesModel[];
  
  constructor(public modal: NgbActiveModal,public categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(result=>{
      this.categoryList = result as CategoriesModel[];
    },error =>{
      console.log("Error occured while fetching the categories");
    });
  }

  get title() {
    return this.isAddMode ? "Add Category" : "Edit Category";
  }

  get name() {
    return (!this.isAddMode) ? this.EditCategoryDetail.categoryName : "";
  }

  set name(name: string) {
    if (name == "")
      this.name = this.EditCategoryDetail.categoryName;
    else
      this.categoryName = name;
  }

  get description() {
    return (!this.isAddMode) ? this.EditCategoryDetail.categoryDescription : "";
  }

  set description(description: string) {
    if (description == "")
      this.categoryDescription = this.EditCategoryDetail.categoryDescription;
    else
      this.categoryDescription = description;
  }



  confirm() {
    var data = {} as CategoriesModel;
   if(this.categoryName=="")
      data.categoryName=this.EditCategoryDetail.categoryName;
   else
    data.categoryName = this.categoryName;
   if(this.categoryDescription=="")
      data.categoryDescription=this.EditCategoryDetail.categoryDescription;
  else
     data.categoryDescription = this.categoryDescription;

    
   
    this.returnData.emit(data);
    this.modal.close();
  }

  dismiss() {
    this.returnData.emit(undefined);
    this.modal.close();
  }

  selectedCategory(){
    console.log("selectedCategory")
  }
}
