import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Page } from '../../interfaces/page.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import { ShowingElementsService } from '../../services/showing-elements.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {

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

  constructor(private recipeService:RecipeService, private router:Router, private showingService: ShowingElementsService) { }

  ngOnInit(): void {
    this.showingService.show();

    this.recipeService.getRecipes(1, 1).subscribe({
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


  getRecipePage(page: number){
    this.recipeService.getRecipes(page, 1).subscribe({
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
