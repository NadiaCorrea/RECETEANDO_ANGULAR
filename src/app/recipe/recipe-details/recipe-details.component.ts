import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import Swal from 'sweetalert2';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { RecipeIngredient } from '../../interfaces/recipeIngredient.interface';
import { Step } from 'src/app/interfaces/step.interface';
import { BackRecipe } from '../../interfaces/backRecipe.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../interfaces/unit.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html'
})

export class RecipeDetailsComponent implements OnInit {

  private id: number = 0;
  listUnits: Unit [] = [];
  filteredUnits:Unit[] = [];
  listIngredients:Ingredient [] = [];
  filteredIngredients:Ingredient[] = [];
  file : any = null;  
  fileName = '';

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

  recipeFormGroup: FormGroup;
  canEdit :boolean = false;


  constructor(private router: Router, private recipeService: RecipeService, private ingredientService: IngredientService, private unitServ:UnitService, private authService:AuthenticationService, private route:ActivatedRoute, private fb:FormBuilder) {

   

    //estructura del formulario
    this.recipeFormGroup = this.fb.group({
      recipeName: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipePhoto: '',
      recipeCreation_date: '',
      recipeIngredients:this.fb.array([]),
      steps:this.fb.array([]),
    })
   }

  // cuando se carga la página
  ngOnInit(): void {
    //recupera el parametro de la URL id
    this.route.params.subscribe(params =>{
      this.id = params['id'];
      //método que llama al servicio que obteniene la receta
      this.getDetails(this.id);
      //llama al servicio que obtiene el listado de ingredientes existentes
      this.getIngredients();
      //lama al servicio que obtiene el listado de unidades existentes
      this.getUnits();
    })
  }

  //método que obtiene los detalles de la receta 
  getDetails(id:number){
    // lamada al servicio 
    this.recipeService.getRecipe(id).subscribe({
      next:(resp) =>{
        //guarda respuesta en el objeto receta
        this.recipe = resp;
        console.log(this.recipe)
        //verificando si el usuario es dueño de la receta o no
        this.canEdit = this.authService.isSameUser(this.recipe.user.userId)
        //asigna el valor del nombre de la receta 
        this.recipeFormGroup.controls['recipeName'].setValue(this.recipe.name);
        //asigna el valor de la descripción de la receta 
        this.recipeFormGroup.controls['recipeDescription'].setValue(this.recipe.description);
        // asigna el valor de la fecha de creación
        this.recipeFormGroup.controls['recipeCreation_date'].setValue(this.recipe.creationDate);
        //recorre los recipeIngredients de la receta para crear recipeIngredientes form array
        this.recipe.recipeIngredients.forEach(recipeIngredient =>{
          const fg = this.getRecipeIngredient(recipeIngredient);
          this.recipeIngredients.push(fg);
        });
        //recorre los pasos de la receta para crear el step  form array
        this.recipe.steps.forEach(step =>{
          const fg = this.getStep(step);
          this.steps.push(fg);
        });
        console.log(this.recipeFormGroup);
      },
      error:(error) =>{
        Swal.fire({
          title: '¡Error!',
          text: 'Ha habido un fallo al obtener la receta.',
          icon: 'error',
          confirmButtonColor: '#476E61'
        });
      }
    });      
    }

    //obtiene los ingredientes llamando al servicio para incluirlos en el desplegable listIngredients
    getIngredients(){
      this.ingredientService.getListIngredients().subscribe({
        next:(resp) =>{
          this.listIngredients = resp;
        },
        error:(error)=>{
          console.log(error);
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



    //Method to get, create and delete the elements of the formArray of recipeIngredients
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
        ingredientUnit:new FormControl({value: {...recipeIngredient.unit, fullname: `${recipeIngredient.unit.name} (${recipeIngredient.unit.abreviation})`}, disabled: !this.canEdit}, Validators.required),
        ingredientId: new FormControl({value: recipeIngredient.ingredientId, disabled: !this.canEdit}, Validators.required)
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
      return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientQuantity')?.errors;
    }

    isValidUnit(index: number) {
      return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.errors;
    }

    isUnitIncluded(index: number){
      return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.touched || this.listUnits.includes((this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientUnit')?.value);
    }

    isValidIngredientId(index: number) {
      return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.errors;
    }

    isIngredientIncluded(index: number){
      return !(this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.touched || this.listIngredients.includes((this.recipeFormGroup.controls['recipeIngredients'] as FormArray).controls[index].get('ingredientId')?.value);
    }

    //Steps Validators 

    isValidOrderNum(index: number) {
      return !(this.recipeFormGroup.controls['steps'] as FormArray).controls[index].get('orderNum')?.errors;
    }

    isValidText(index: number) {
      return !(this.recipeFormGroup.controls['steps'] as FormArray).controls[index].get('detail')?.errors;
    }


    uploadFile(event:any){
      this.file = event.target.files[0];
      console.log(this.file);
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
          unit: ingredient.ingredientUnit
        }
        recipeIngredients.push(recipeIngredient);
      });
      console.log(recipeIngredients)
      this.backRecipe.recipeIngredients = recipeIngredients;
    }

    onSubmit(){
      console.log( "envia " + this.recipeFormGroup.value)
      const formData = new FormData();
      formData.append('file', this.file);
      this.formGroupToBackRecipe();
      const userBlob = new Blob([JSON.stringify(this.backRecipe)], {type:'application/json'});
      formData.append('recipe', userBlob);
      
      this.recipeService.updateRecipe(formData, this.id).subscribe({
        next:(resp) =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios guardados correctamente',
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
    
 

  }
  