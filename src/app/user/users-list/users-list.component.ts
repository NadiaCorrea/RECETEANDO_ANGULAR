import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'username', 'name', 'email', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private userServ: UserService) {

    const users:User[] = [];
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.userServ.getUsers().subscribe({
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

  removeUser(id:number){
    Swal.fire({
      title: '¿Estás seguro de querer eliminar este usuario?',
      text: "No será posible revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#476E61',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServ.deleteUser(id).subscribe({
          next:(resp) =>{
            Swal.fire({
              title:'Eliminado',
              text:'El usuario ha sido eliminado',
              icon:'success',
              confirmButtonColor: '#476E61'
          })
            this.userServ.getUsers().subscribe({
              next:(resp) =>{
                this.dataSource.data = resp;
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



