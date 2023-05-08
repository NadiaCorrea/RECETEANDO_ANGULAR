import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})

export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'description', 'update', 'delete'];

  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private categoryServ:CategoryService, public dialog:MatDialog) {
    const categories:Category[] =[];
    this.dataSource = new MatTableDataSource(categories);
   }

  ngOnInit(): void {
  }

  //getting all the data to show on the table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    this.categoryServ.getCategories().subscribe({
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

deleteCategory(id:number){
  Swal.fire({
    title: '¿Estás seguro de querer eliminar esta categoría?',
    text: "No será posible revertir este cambio.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#476E61',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar.'
  }).then((result)=>{
    if(result.isConfirmed){
      this.categoryServ.deleteCategory(id).subscribe({
        next:(resp) =>{
          Swal.fire({
            title:'Eliminada',
            text:'La categoría ha sido eliminado',
            icon:'success',
            confirmButtonColor: '#476E61'
          })
          this.categoryServ.getCategories().subscribe({
            next:(resp) =>{
              this.dataSource.data = resp;
            }
          })
        },
        error:(error) =>{
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

updateCategory(category:Category){
  const dialogRef = this.dialog.open(CategoryEditComponent,{
    width:'600 px',
    data: category
  });

  dialogRef.afterClosed().pipe(filter(data => data !== undefined)).subscribe(result =>{
    this.categoryServ.updateCategory(result).subscribe({
      next:(resp)=>{
        Swal.fire({
          title:'Guardada',
          text:'La categoría ha sido modificada',
          icon:'success',
          confirmButtonColor: '#476E61'
      })
        this.categoryServ.getCategories().subscribe({
          next:(resp)=>{
            this.dataSource.data = resp;
          }
        })
      },
      error:(error)=>{
        Swal.fire({
          icon: 'error',
          title: '¡Upss!',
          text: `${error.error.message}`,
          confirmButtonColor: '#476E61'
        })
      }
    })
  })



}



}
