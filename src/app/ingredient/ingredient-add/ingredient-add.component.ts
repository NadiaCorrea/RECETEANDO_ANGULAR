import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html'
})
export class IngredientAddComponent implements OnInit {

  categories: Category[] = []
  category: Category = {categoryId:0,name:'', description:'' }

  ingredient:Ingredient ={
    name: '',
    description:'',
    category: {categoryId:0,name:'', description:'' }
  }

  constructor(private ingredientServ:IngredientService, private categoryServ:CategoryService, private router:Router ) { }

  @ViewChild('myForm') myForm !:NgForm;

  ngOnInit(): void {
    this.getAllcategories();
  }
  
  notValidField(field:string):boolean {
    return this.myForm?.controls[field]?.invalid &&
    this.myForm?.controls[field]?.touched;
  }

  addIngredient(){
    let id = this.category.categoryId || 0;
    this.categoryServ.getCategory(id).subscribe({
      next:(resp)=>{
        this.ingredient.category = resp;
      }, 
      complete: () =>{
        this.ingredientServ.addIngredient(this.ingredient).subscribe({
          next:(resp) =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El ingrediente ha sido añadido.',
              showConfirmButton: true,
              confirmButtonColor: '#476E61',
              timer: 3500
            });
            this.router.navigate(['/ingredient/list']);
          }, 
          error:(error)=>{
            Swal.fire({
              title: 'Ha acurrido un error',
              text: `${error.error.message}`,
              icon: 'error',
              confirmButtonColor: '#476E61'
            });
          }
        });    
      }
    })
  }
  
  //getting all categories to show on the select 
  getAllcategories(){
    this.categoryServ.getCategories().subscribe({
      next:(resp)=>{
        this.categories = resp;
      }
    })
  }

  //getting existing category to add it to the new ingredient category
  getExistingCategory(id:number){
    
  }

}
