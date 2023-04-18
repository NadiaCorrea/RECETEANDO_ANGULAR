import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { MatTableDataSource } from '@angular/material/table';
import { Unit } from '../../interfaces/unit.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UnitEditComponent } from '../unit-edit/unit-edit.component';
import { filter } from 'rxjs';


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html'
})
export class UnitListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'abreviation', 'update', 'delete'];
  dataSource: MatTableDataSource<Unit>;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private unitServ:UnitService, public dialog: MatDialog) {
    const units: Unit [] = [];
    this.dataSource = new MatTableDataSource(units);
   }

  ngOnInit(): void {
  }

  //getting all the data to show on the table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    this.unitServ.getUnits().subscribe({
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

deleteUnit(id:number){
  Swal.fire({
    title: '¿Estás seguro de querer eliminar esta unidad?',
    text: "No será posible revertir este cambio.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#476E61',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.unitServ.deleteUnit(id).subscribe({
        next:(resp) =>{
          Swal.fire({
            title: 'Eliminada',
            text: 'La unidad ha sido eliminada',
            icon:'success',
            confirmButtonColor: '#476E61'
        })
          this.unitServ.getUnits().subscribe({
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

updateUnit(unit: Unit){
  const dialogRef = this.dialog.open(UnitEditComponent, {
    width: '600px',
    data: unit
  });

  dialogRef.afterClosed().pipe(filter(data => data !== undefined)).subscribe(result => {
    this.unitServ.updateUnit(result).subscribe({
      next:(resp)=>{
        Swal.fire({
          title:'Guardada',
          text:'La unidad ha sido modificada',
          icon:'success',
          confirmButtonColor: '#476E61'
      })
        this.unitServ.getUnits().subscribe({
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
