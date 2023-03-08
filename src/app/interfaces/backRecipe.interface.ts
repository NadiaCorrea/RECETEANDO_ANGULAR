import { Step } from './step.interface';
import { RecipeIngredient } from './recipeIngredient.interface';

export interface BackRecipe {
    name: string;
    description: string;
    steps:Step[];
    recipeIngredients:RecipeIngredient[];
}