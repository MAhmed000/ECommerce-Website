import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList:any=['Brand New','Second Hand','Refurbished']
  AddEditButtonName:any="Add";
  productForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,private service:ApiService,private dialog:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) private matData:any) { }
  
  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productname:['',Validators.required],
      productcategory:['',Validators.required],
      productdate:['',Validators.required],
      freshnesssItem:['',Validators.required],
      productprice:['',Validators.required],
      comment:['',Validators.required]
    });

    if(this.matData){
      this.productForm.controls['productname'].setValue(this.matData.productname);
      this.productForm.controls['productcategory'].setValue(this.matData.productcategory);
      this.productForm.controls['productdate'].setValue(this.matData.productdate)
      this.productForm.controls['freshnesssItem'].setValue(this.matData.freshnesssItem)
      this.productForm.controls['productprice'].setValue(this.matData.productprice)
      this.productForm.controls['comment'].setValue(this.matData.comment)
      this.AddEditButtonName="Edit";
    }
    
  }

  AddOrEditProduct(){
    if(this.matData){
      if(this.productForm.valid){
        this.service.EditProduct(this.productForm.value,this.matData.id).subscribe({
          next:(d)=>{
            alert("Record Updated Successfully....!")
            this.productForm.reset();
            this.dialog.close("Save");
          },error:()=>{
            alert("Record Not Updated...!")
          }
        })
      }
    }else{
      if(this.productForm.valid){
        this.service.AddNewProduct(this.productForm.value).subscribe({
          next:(d)=>{
            alert("Product Added Successfully...!")
            this.productForm.reset();
            this.dialog.close("ADD");
          },error:()=>{
            alert("Some Error here..!")
          }
        });
      }else{
        alert("Please Fill the Required Fields....!");
      }
    }
  }
}
