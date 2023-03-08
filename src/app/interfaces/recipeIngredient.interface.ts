import { Ingredient } from "./ingredient.interface";

export interface RecipeIngredient{
    ingredientId: Ingredient,
	quantity: number,
	unit: string
}