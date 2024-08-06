import { Ingredient } from "./ingredient"

export interface Recipe {
    id: number,
    name: string,
    methods: string[],
    ingredients: Ingredient[],
    photo: string,
    prepTime: string,
    portionNumber: number,
    favorite: boolean
}
