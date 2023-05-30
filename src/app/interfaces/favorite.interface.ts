export interface Favorite {
    favoriteId?:number,
    recipeId:number,
    userId:number,
    name:string,
	photo: string,
	description: string,
	owner: string
}

export interface NewFavorite{
    recipeId:number
}