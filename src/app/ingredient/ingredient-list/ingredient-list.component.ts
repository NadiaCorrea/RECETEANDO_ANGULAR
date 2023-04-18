import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IngredientService } from '../../services/ingredient.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IngredientEditComponent } from '../ingredient-edit/ingredient-edit.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'description', 'category', 'update', 'delete'];
  dataSource: MatTableDataSource<Ingredient>;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private ingredientServ:IngredientService, public dialog: MatDialog) { 
    const ingredients : Ingredient [] = [];
    this.dataSource = new MatTableDataSource(ingredients);
  }

  ngOnInit(): void {
  }

   //getting all the data to show on the table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    this.ingredientServ.getListIngredients().subscribe({
      next:(resp) =>{
        this.dataSource.data = resp;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteIngredient(id:number){
    Swal.fire({
      title: '¿Estás seguro de querer eliminar este ingrediente?',
      text: "No será posible revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#476E61',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingredientServ.deleteIngredient(id).subscribe({
          next:(resp) =>{
            Swal.fire({
              title: 'Eliminado',
              text: 'El ingrediente ha sido eliminado',
              icon:'success',
              confirmButtonColor: '#476E61'
          })
            this.ingredientServ.getListIngredients().subscribe({
              next:(resp) =>{
                this.dataSource.data = resp;
              }
            })
          }, error:(error)=>{
            Swal.fire({
              icon: 'error',
              title: '¡Upss!',
              text: `${error.error.message}`
            })
          }
        })
      }
    })
  }

  updateIngredient(ingredient: Ingredient){
    const dialogRef = this.dialog.open(IngredientEditComponent, {
      width: '600px',
      data: ingredient
    });
  
    dialogRef.afterClosed().pipe(filter(data => data !== undefined)).subscribe(result => {
      this.ingredientServ.updateIngredient(result).subscribe({
        next:(resp)=>{
          Swal.fire({ 
            title:'Guardado',
            text:'El ingrediente ha sido modificado',
            icon:'success',
            confirmButtonColor: '#476E61'
          })
          this.ingredientServ.getListIngredients().subscribe({
            next:(resp) =>{
              this.dataSource.data = resp;
            }
          })
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: '¡Upss!',
            text: `${error.error.message}`
          })
        }
      })
    });
  
  }


  }

