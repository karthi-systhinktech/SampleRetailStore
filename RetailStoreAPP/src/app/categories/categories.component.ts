import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesModel } from '../services/categories-model.model';
import { CategoryService } from '../services/categories.service';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
// import { ModalService } from '../modal/modal';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categoryName:string;
  public categoryDescription: string;
  public id:number;
  public categories: CategoriesModel[];

  public categoryData:string='Categories Management';

  public navigator:string='/products';

  public navigationLink:string='View All Products';

  constructor(private ngbModal:NgbModal,public categoryService:CategoryService,public modalService:NgbModal) { 
  }

  ngOnInit(): void {
    console.log(this.loadCategoryTable)
    this.loadCategoryTable();
  }

  private loadCategoryTable():void{
    this.categoryService.getCategoryList().subscribe(result=>{
      this.categories = result as CategoriesModel[];
    },error =>{
      console.log("Error occured while fetching the categories");
    });
  }

  editCategoryDetails(value:CategoriesModel){
    this.categoryName = value.categoryName;
    this.categoryDescription = value.categoryDescription;
    this.id=value.id;
  }

   updateRecord(form:any){
    this.categoryService.editCategoryItem(form).subscribe(
      res => {
         this.loadCategoryTable(); 
      },
      err =>{ console.log(err);}
    );   
  }

  insertRecord(form:any){
    this.categoryService.addCategory(form).subscribe(res => {
         this.loadCategoryTable();    
      },err =>{ console.log(err);}
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
  }

  onDelete(id:number){
    if(confirm("Are you sure you want to delete")){
    this.categoryService.deleteCategory(id).subscribe(
      res=>{ 
         this.loadCategoryTable(); 
        },
      err=>{ console.log(err);}
    );
  }
 }

 showDialog(){
  var modalRef= this.ngbModal.open(ModalComponent,{size:'md',backdrop:'static'});
  modalRef.componentInstance.isAddMode =true;
  modalRef.componentInstance.returnData.subscribe((result:CategoriesModel)=>{
  if(result != undefined){
    this.insertRecord(result)  
  }
  else{
    console.log("operation cancelled");
  }
  });
 }

 showEditDialog(cl:any){
  var modalRef= this.ngbModal.open(ModalComponent,{size:'md',backdrop:'static'});
  modalRef.componentInstance.isAddMode =false;
  modalRef.componentInstance.EditCategoryDetail =cl;
  modalRef.componentInstance.returnData.subscribe((result:CategoriesModel)=>{
    if(result != undefined){
      result.id=cl.id;
      console.log(result)
      this.updateRecord(result)  
    }
    else{
      console.log("operation cancelled");
    }
    });

 }
}
