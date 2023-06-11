import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite } from '../../interfaces/favorite.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html'
})
export class FavoriteListComponent implements OnInit {
  loaded:boolean = false;
  favorites: Favorite[] = [];

  constructor(private favoriteServ:FavoriteService) { }

  ngOnInit(): void {
    this.getFavoritesByUser();
  }

   //Method to get favorite's list of a user
  getFavoritesByUser(){
    this.favoriteServ.getFavoritesByUser().subscribe({
      next:(resp) =>{
        this.favorites = resp;
      },
      error:(error) =>{
        console.log(error);
      },
      complete:() =>{
        this.loaded = true;
      }
    })
  }

  //Method to delete Recipe from favorite's list
  deleteFavorite(id:any){
    Swal.fire({
      title: '¿Estás seguro de querer eliminar esta receta de favoritos?',
      text: "No será posible revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#476E61',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.favoriteServ.deleteFavorite(id).subscribe({
          next:(resp) =>{
            Swal.fire({
              title: 'Eliminada',
              text: 'La receta ha sido eliminada de favoritos',
              icon:'success',
              confirmButtonColor: '#476E61'
          })
            this.favoriteServ.getFavoritesByUser().subscribe({
              next:(resp) =>{
                this.favorites = resp;
              }
            })
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

}
