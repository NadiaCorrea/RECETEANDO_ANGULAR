import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Page } from '../../interfaces/page.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import { SearchService } from '../../services/search.service';
import Swal from 'sweetalert2';
import { filter} from 'rxjs'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {

  private keyword :string = '';

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

  constructor(private recipeService:RecipeService, private router:Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.show();

    this.getRecipePage();

    this.searchService.searchObservable.pipe(filter(value => value !== null)).subscribe({
      next:(resp)=>{
        this.keyword = resp;
        this.getRecipePage(1, 6, "name");
      }, 
      error:(error) => {
        console.log(error);
      }
    });

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
