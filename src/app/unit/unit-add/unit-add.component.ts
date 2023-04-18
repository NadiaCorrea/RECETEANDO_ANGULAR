import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Unit } from '../../interfaces/unit.interface';
import { UnitService } from '../../services/unit.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html'
})
export class UnitAddComponent implements OnInit {

  unit: Unit = {
  name: "",
  abreviation: ""
}
  constructor(private unitServ: UnitService, private router:Router) { }

  @ViewChild('myForm') myForm !:NgForm;

  ngOnInit(): void {
  }

  //method that validates that the form's fields meet the requirements 
  notValidField(field:string):boolean {
    return this.myForm?.controls[field]?.invalid &&
    this.myForm?.controls[field]?.touched;
  }

  addUnit(){
    this.unitServ.addUnit(this.unit).subscribe({
      next:(resp) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La unidad ha sido añadida.',
          showConfirmButton: true,
          timer: 3500
        });
        this.router.navigate(['/unit/list']);
      }, 
      error:(error)=>{
        Swal.fire({
          title: 'Ha acurrido un error',
          text: `${error.error.message}`,
          icon: 'error'
        });
      }
    });

  }
}
