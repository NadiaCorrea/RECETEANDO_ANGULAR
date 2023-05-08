import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html'
})
export class CategoryAddComponent implements OnInit {

category:Category = {
  name:"",
  description:""
}

  constructor(private categoryServ:CategoryService, private router:Router) { }

  @ViewChild('myForm') myForm !:NgForm;

  ngOnInit(): void {
  }

  //method that validates that the form's fields meet the requirements 
  notValidField(field:string):boolean {
    return this.myForm?.controls[field]?.invalid &&
    this.myForm?.controls[field]?.touched;
  }

  addCategory(){
    this.categoryServ.addCategory(this.category).subscribe({
      next:(resp) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La categoría ha sido añadida.',
          showConfirmButton: true,
          confirmButtonColor: '#476E61',
          timer: 3500
        });
        this.router.navigate(['/category/list']);
      }, 
      error:(error) =>{
        Swal.fire({
          title: 'Ha acurrido un error',
          text: `${error.error.message}`,
          icon: 'error',
          confirmButtonColor: '#476E61',
        });
      }
    });
  }
}
