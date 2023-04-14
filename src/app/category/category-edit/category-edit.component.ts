import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {

  info:Category ={categoryId:0, name:"", description:""};

  constructor(public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public category:Category) { }

  ngOnInit(): void {
    this.info = {categoryId:this.category.categoryId, name:this.category.name, description:this.category.description}
  }

  onNoClick():void{
    this.dialogRef.close();
  }

}
