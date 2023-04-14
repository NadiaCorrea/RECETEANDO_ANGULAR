import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Page } from '../../interfaces/page.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {

  keyword :string = '';

  @ViewChild('myForm') myForm !: NgForm;

  recipes: Page<Recipe> = {
    content: [],
    last: false,
    first:true,
    totalPages:0,
    totalElements:0,
    size:0,
    number:0,
    numberOfElements:0
  };

  constructor(private recipeService:RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.getRecipePage();
  }

  search(){
    this.getRecipePage(1, 6, "name");
  }

  getRecipePage(pageNumber:number = 1, sizeNumber:number = 6, sortField:string = "name"){
    this.recipeService.getRecipes(pageNumber, sizeNumber, sortField, this.keyword).subscribe({
      next:(resp) =>{
        this.recipes = resp;
      },
      error:(error) =>{
        Swal.fire({
          title: '¡Error!',
          text: 'Ha habido un fallo al obtener las recetas.',
          icon: 'error'
        });
      }
    })
  }



  

}
