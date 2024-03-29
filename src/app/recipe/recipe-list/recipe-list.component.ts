import { RecipeService } from '../../services/recipe.service';
import { Page } from '../../interfaces/page.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { NewFavorite } from '../../interfaces/favorite.interface';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientFilter } from '../../interfaces/ingredientFilter';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from 'src/app/interfaces/rating.interface';
import { RatingService } from 'src/app/services/rating.service';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {

  ingredients:Ingredient[] = [];
  selectedIngredients:Ingredient[] = [];
  newRating:number = 0;
  selectedStars:number = 0;
  hoveredStars:number = 0;
  rating: Rating = {points: 0, recipe: {recipeId: 0, name: ''}};
  readonly = false;

  @ViewChild("paginator") paginator !: PaginatorComponent;

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

  constructor(private recipeService:RecipeService, private router:Router, private authService:AuthenticationService, private favoriteServ:FavoriteService, private ingredientServ:IngredientService, private config:NgbRatingConfig, private ratingServ:RatingService) { }

  ngOnInit(): void {
    this.getIngredients();
    this.getRecipePage();
    //setting up the total number of stars used in the rating
    this.config.max = 5;
    //on cards stars are for read only
    this.config.readonly = true;
  }

  getIngredients(){
    this.ingredientServ.getListIngredients().subscribe({
      next:(resp) =>{
        this.ingredients = resp;
      },
      error:(error)=>{
        console.log("No hay ingredientes");
      }
    })
  }

  search(){
    this.getRecipePage(1, 6, "name");
  }

  clear(){
    this.selectedIngredients = [];
    this.getRecipePage();
  }

  //method to get recipes
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

  //Method to verifry if the user is the owner of the recipe
  canEditRecipe(recipe :Recipe){
    return this.authService.isSameUser(recipe.user.userId);
  }

  //Method to verify if the user has an admin rol
  isAdmin(){
    return this.authService.isAdmin();
  }
  
  //Method to deleta a recipe
  deleteRecipe(id:any){
    let recipeName: string = "";
    this.recipeService.getRecipe(id).subscribe({
      next:(resp)=>{
        recipeName = resp.name;
      }, 
      error:(error)=>{
        console.log(error);
      }, 
      complete:() =>{
        Swal.fire({
          title: `¿Estás seguro de querer eliminar ${recipeName}?`,
          text: "No será posible revertir este cambio.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#476E61',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        })  .then((result) => {
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
                })}
              })
            }
          })
      }
    })
    }

//Method to add or remove a recipe from favorite's list
changeFavorite(recipe:Recipe){
  const isFavorite = recipe.favorite;
  const recipeId:any = recipe.recipeId;
  //if is mark as favorite, it gets removed
  if(isFavorite){
    this.favoriteServ.deleteFavoriteRecipeId(recipeId).subscribe({
      next:(resp)=>{

      },
      error:(error)=>{
        console.log(error);
      }, 
      complete:()=>{
        this.getRecipePage(this.paginator.selected);
      }
    })
    //if is not mark as favorite is added
  } else{
    const recipeToAdd: NewFavorite = {recipeId:recipeId}
    this.favoriteServ.addFavorite(recipeToAdd).subscribe({
      next:(resp) =>{
        
      },
      error:(error)=>{
        console.log(error);
      }, 
      complete:()=>{
        this.getRecipePage(this.paginator.selected);
      }
    })
  }
}

//Method to show the modal for voting
votingModal(id:any){
  this.selectedStars = 0;
  this.ratingServ.getRating(id).subscribe({
    next:(resp) =>{
      this.rating = resp;
      this.selectedStars = this.rating.points;
    }, 
    error:(error) =>{
      console.log(error);
    }
  })
}

//Method to submit the vote
voteRecipe(){
  const newRating: Rating = {
    points: this.selectedStars,
    recipe: {
      recipeId: this.rating.recipe.recipeId,
      name: this.rating.recipe.name
    }
  };

  this.ratingServ.addRating(newRating).subscribe({
    next:(resp) =>{
      this.getRecipePage(this.paginator.selected);
    },
    error:(error) =>{
      console.log(error)
    }
  });
}

}
