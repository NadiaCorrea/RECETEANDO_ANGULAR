import { Step } from "./step.interface";
import { User } from "./user.interface";
import { RecipeIngredient } from './recipeIngredient.interface';

export interface Recipe{
    recipeId ?: number;
    userId ?: User;
    name: string;
    description: string;
    photo: string;
    creationDate: Date;
    steps:Step[];
    recipeIngredients:RecipeIngredient[];
}