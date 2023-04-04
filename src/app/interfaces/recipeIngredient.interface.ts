import { Ingredient } from "./ingredient.interface";
import { Unit } from './unit.interface';

export interface RecipeIngredient{
    ingredientId: Ingredient,
	quantity: number,
	unit: Unit
}