import { Ingredient } from '../../interfaces/ingredient.interface';
import { Category } from '../../interfaces/category.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html'
})
export class IngredientEditComponent implements OnInit {

  info: Ingredient = {ingredientId:0, name:'', description:'', category : {categoryId:0, name:'', description:''}}
  categoryName:string = '';
  categoryId:number = 0;
  categories:Category [] = [];
  filteredCategories !: Observable<Category[]>;

  constructor(public dialogRef : MatDialogRef<IngredientEditComponent>,
  @Inject(MAT_DIALOG_DATA) public ingredient :Ingredient, private categoryServ: CategoryService) { }

  ngOnInit(): void {
    this.info = {ingredientId:this.ingredient.ingredientId, name:this.ingredient.name, description: this.ingredient.description, category:{categoryId: this.ingredient.category?.categoryId, name : this.ingredient.category?.name ? this.ingredient.category?.name : '', description:this.ingredient.category?.description }}
    this.categoryName = this.ingredient.category?.name || '';
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategories(){
    this.categoryServ.getCategories().subscribe({
      next:(resp) => {
        this.categories=resp;
      }
    })
  }

  onChange($event: any){
    this.filteredCategories = of(this.categories.filter(val => val.name.toLowerCase().includes($event) === true))
  }

  setCategory(category:Category){
    this.info.category = category;
  }



}

