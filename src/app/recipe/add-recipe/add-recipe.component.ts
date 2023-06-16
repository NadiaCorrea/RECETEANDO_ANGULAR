import { Ingredient } from 'src/app/interfaces/ingredient.interface';
import { Unit } from '../../interfaces/unit.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import { IngredientService } from '../../services/ingredient.service';
import { UnitService } from '../../services/unit.service';
import { RecipeService } from '../../services/recipe.service';
import { BackRecipe } from '../../interfaces/backRecipe.interface';
import { Step } from 'src/app/interfaces/step.interface';
import { RecipeIngredient } from '../../interfaces/recipeIngredient.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html'
})
export class AddRecipeComponent implements OnInit {

  listUnits: Unit [] = [];
  filteredUnits:Unit[] = [];
  listIngredients:Ingredient [] = [];
  filteredIngredients:Ingredient[] = [];
  file : any = null;  
  fileName = '';
  recipeFormGroup: FormGroup;

  backRecipe :BackRecipe = {
    name: '',
    description: '',
    steps: [],
    recipeIngredients: []
  }

  recipe:Recipe = {
    recipeId : 0,
    user: {username:'', email:'',name:''},
    name: "",
    description: "",
    photo: "",
    creationDate: new Date(),
    steps: [],
    recipeIngredients :[]
  };
  
  constructor(private ingredientServ:IngredientService, private unitServ: UnitService, private recipeServ:RecipeService, private fb:FormBuilder, private router:Router) {

    this.recipeFormGroup = this.fb.group({
      recipeName: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipePhoto: '',
      recipeCreation_date: '',
      recipeIngredients:this.fb.array([]),
      steps:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.getIngredients();
    this.getUnits();
  }

  //getting existing ingredients
  getIngredients(){
    this.ingredientServ.getListIngredients().subscribe({
      next:(resp)=>{
        this.listIngredients = resp;
      }
    })
  }

  //getting existing units
  getUnits(){
    this.unitServ.getUnits().pipe(map((units: Unit[]) => {
      return units.map(unit => {
        return {...unit, fullname: `${unit.name} (${unit.abreviation})`};
      });
    })).subscribe({
      next:(resp)=>{
        this.listUnits = resp;
      }
    })
  }
  
  //Method that filters units that include the input text
  filterUnit(event:any){
    let filtered: Unit[] = [];
    let query = event.query;

    for(let i = 0; i < this.listUnits.length; i ++){
      let unit = this.listUnits[i];
      if(unit.fullname?.toLowerCase().includes(query.toLowerCase())){
        filtered.push(unit);
      }
    }

    this.filteredUnits = filtered;
  }

  //Method that filters ingredients that include the input text
  filterIngredient(event:any){
    let filtered:Ingredient[] = [];
    let query = event.query;

    for(let i = 0; i < this.listIngredients.length; i ++){
      let ingredient = this.listIngredients[i];
      if(ingredient.name?.toLowerCase().includes(query.toLowerCase())){
        filtered.push(ingredient);
      }
    }
    this.filteredIngredients = filtered;
  }

  get recipeIngredients(): FormArray{
    return this.recipeFormGroup.get('recipeIngredients') as FormArray;
  }
  
  newRecipeIngredient():FormGroup{
    return this.fb.group({
      ingredientQuantity: ['', Validators.required],
      ingredientUnit: ['', Validators.required],
      ingredientId:['', Validators.required]
    })
  }

  getRecipeIngredient(recipeIngredient: RecipeIngredient):FormGroup{
    return this.fb.group({
      ingredientQuantity: [recipeIngredient.quantity, Validators.required],
      ingredientId: new FormControl( recipeIngredient.ingredientId.ingredientId, Validators.required)
    })
  }

  addRecipeIngredients(){
    this.recipeIngredients.push(this.newRecipeIngredient());
  }

  removeRecipeIngredient(i:number){
    this.recipeIngredients.removeAt(i);
  }

  get steps():FormArray{
    return this.recipeFormGroup.get('steps') as FormArray;
  }

  newStep():FormGroup{
    return this.fb.group({
      orderNum : ['', Validators.required],
      detail:['', Validators.required],
    })
  }

  getStep(step: Step):FormGroup{
    return this.fb.group({
      orderNum:  [step.orderNum, Validators.required],
      detail:  [step.detail, Validators.required]
    })
  }

  addSteps(){
    this.steps.push(this.newStep());
  }

  removeStep(i:number){
    this.steps.removeAt(i);
  }


//Ingredients Validators 
 isValidQuantity(index: number) {
    return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientQuantity')?.errors || !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientQuantity')?.touched;
    ;
  }

  isValidUnit(index: number) {
    return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.errors || !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.touched;
  }

  isUnitIncluded(index: number){
    return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.touched || this.listUnits.includes((this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.value);
  }

  isValidIngredientId(index: number) {
    return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.errors || !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.touched;
  }

  isIngredientIncluded(index: number){
    return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.touched || this.listIngredients.includes((this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.value);
  }

  //Steps Validators 

  isValidOrderNum(index: number) {
    return !(this.recipeFormGroup.controls['steps'] as FormArray).controls[index].get('orderNum')?.errors || !(this.recipeFormGroup.controls['steps'] as FormArray).controls[index].get('orderNum')?.touched;
  }

  isValidText(index: number) {
    return !(this.recipeFormGroup.controls['steps'] as FormArray).controls[index].get('detail')?.errors || !(this.recipeFormGroup.controls['steps'] as FormArray).controls[index].get('detail')?.touched;
  }
  isValidField(field:string) {
    return !this.recipeFormGroup.controls[`${field}`]?.errors || !this.recipeFormGroup.controls[`${field}`]?.touched;
  }

  uploadFile(event:any){
    this.file = event.target.files[0];
    if(this.file){
      this.fileName = this.file.name;
    }
  }

  formGroupToBackRecipe(){
    this.backRecipe.name = this.recipeFormGroup.value.recipeName;
    this.backRecipe.description = this.recipeFormGroup.value.recipeDescription;
    this.backRecipe.steps = this.steps.value;

    const recipeIngredients: RecipeIngredient[] = [];
    const ingredientsList:[] = this.recipeFormGroup.value.recipeIngredients;
    ingredientsList.forEach((ingredient:any) => {
      const recipeIngredient:RecipeIngredient = {
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.ingredientQuantity,
        unit:  ingredient.ingredientUnit
      }
      recipeIngredients.push(recipeIngredient);
    });
    this.backRecipe.recipeIngredients = recipeIngredients;
  }

  addRecipe(){
    const formData = new FormData();
    formData.append('file', this.file);
    this.formGroupToBackRecipe();
    const userBlob = new Blob([JSON.stringify(this.backRecipe)], {type:'application/json'});
    formData.append('recipe', userBlob);

    this.recipeServ.addRecipe(formData).subscribe({
      next:(resp) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Receta añadida correctamente',
          showConfirmButton: true,
          confirmButtonColor: '#476E61',
          timer: 3000
        });
        this.router.navigate(['/recipe']);
      }, 
      error:(error) =>{
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: `${error.error.message}`,
          confirmButtonColor: '#476E61'
        })
      }
    });

  }

}
