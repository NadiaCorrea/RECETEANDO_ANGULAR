import { Category } from "./category.interface";

export interface Ingredient{
    ingredientId?: number, 
    name ?: string, 
    description ?: string, 
    category ?: Category
}