import { RecipeService } from '../../services/recipe.service';
import { Page } from '../../interfaces/page.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { NewFavorite } from '../../interfaces/favorite.interface';
import { IngredientFilter } from '../../interfaces/ingredientFilter';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {

  ingredients:Ingredient[] = [];
  selectedIngredients:Ingredient[] = [];

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

  constructor(private recipeService:RecipeService, private router:Router, private authService:AuthenticationService, private favoriteServ:FavoriteService, private ingredientServ:IngredientService) { }

  ngOnInit(): void {
    this.getIngredients();
    this.getRecipePage();
  }

  getIngredients(){
    this.ingredientServ.getListIngredients().subscribe({
      next:(resp) =>{
        this.ingredients = resp;
      },
      error:(error)=>{
        console.log("no hay ingredientes");
      }
    })
  }

  search(){
    this.getRecipePage(1, 6, "name");
  }

  getRecipePage(pageNumber:number = 1, sizeNumber:number = 6, sortField:string = "name"){
    const ingredients:any[] = this.selectedIngredients.map(ing => ing.ingredientId);
    const ingFilter:IngredientFilter = {ingredientsIds: ingredients};
    this.recipeService.getRecipesByingredients(pageNumber, sizeNumber, sortField,ingFilter).subscribe({
      next:(resp) =>{
        this.recipes = resp;
      },
      error:(error) =>{
        Swal.fire({
          title: '¡Error!',
          text: 'Ha habido un fallo al obtener las recetas.',
          icon: 'error',
          confirmButtonColor: '#476E61'
        });
      }
    })
  }

 


  canEditRecipe(recipe :Recipe){
    //verificando si el usuario es dueño de la receta o no
    return this.authService.isSameUser(recipe.user.userId);
  }

  isAdmin(){
    return this.authService.isAdmin();
  }
  
  deleteRecipe(id:any){
   Swal.fire({
    title: '¿Estás seguro de querer eliminar esta receta?',
    text: "No será posible revertir este cambio.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#476E61',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.recipeService.deleteRecipe(id).subscribe({
        next:(resp) =>{
          Swal.fire({
            title: 'Eliminada',
            text: 'La receta ha sido eliminada',
            icon:'success',
            confirmButtonColor: '#476E61'
        })
        this.getRecipePage();
        }, error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: '¡Upss!',
            text: `${error.error.message}`,
            confirmButtonColor: '#476E61'
          })
        }
      })
    }
  })
}

changeFavorite(recipe:Recipe){

  const isFavorite = recipe.favorite;
  const recipeId:any = recipe.recipeId;
  
  if(isFavorite){
    this.favoriteServ.deleteFavoriteRecipeId(recipeId).subscribe({
      next:(resp)=>{
        this.updateRecipe(recipeId, false);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  } else{
    const recipeToAdd: NewFavorite = {recipeId:recipeId}
    this.favoriteServ.addFavorite(recipeToAdd).subscribe({
      next:(resp) =>{
        this.updateRecipe(recipeId, true);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}

private updateRecipe(recipeId: number, value: boolean) {
  const existingRecipe = this.recipes.content.find(rec => rec.recipeId === recipeId);
  if (existingRecipe) {
    existingRecipe.favorite = value;
  }
}

  

}
