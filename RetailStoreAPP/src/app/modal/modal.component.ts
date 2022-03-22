import { EventEmitter, Input, Output } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Optional } from "@angular/core";
import { NgbActiveModal, NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesModel } from "../services/categories-model.model";


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

  constructor(public modal: NgbActiveModal) {
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
      this.categoryDescription = this.EditCategoryDetail.categoryDescription
    else
      this.categoryDescription = description;
  }



  confirm() {
    var data = {} as CategoriesModel;
    data.categoryDescription = this.categoryDescription;
    data.categoryName = this.categoryName;

    this.returnData.emit(data);
    this.modal.close();
  }

  dismiss() {
    this.returnData.emit(undefined);
    this.modal.close();
  }
}
