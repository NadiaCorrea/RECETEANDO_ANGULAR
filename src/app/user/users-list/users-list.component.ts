import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'username', 'name', 'email', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private userServ: UserService, private searchService: SearchService) {

    const users:User[] = [];
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.searchService.hide();
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
    console.log(id)
    Swal.fire({
      title: '¿Estás seguro de querer eliminar este usuario?',
      text: "No será posible revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServ.deleteUser(id).subscribe({
          next:(resp) =>{
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado',
              'success'
            )
            this.userServ.getUsers().subscribe({
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

}



