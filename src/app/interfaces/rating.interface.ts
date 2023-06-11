export interface Rating{
    points:number,
    recipe:AddRating
}

export interface AddRating{
    recipeId: number,
    name: string
}