import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from '../../interfaces/unit.interface';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html'
})
export class UnitEditComponent implements OnInit {

  info: Unit = {unitId:0, name:'', abreviation:''};

  constructor(public dialogRef: MatDialogRef<UnitEditComponent>,
    @Inject(MAT_DIALOG_DATA) public unit: Unit) { }

  ngOnInit(): void {
    this.info = {unitId: this.unit.unitId, name: this.unit.name, abreviation: this.unit.abreviation};
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
