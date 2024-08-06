import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  urlRecipes = 'http://localhost:3000/recipes';

  constructor() { }

  async getAllRecipes(): Promise<Recipe[]> {
    const data = await fetch(this.urlRecipes);
    return await data.json() ?? [];
  }

  async getRecipeById(id: Number): Promise<Recipe | undefined> {
    const data = await fetch(`${this.urlRecipes}/${id}`);
    return await data.json() ?? {};
  }

  async changeFavoriteValue(id: Number, value: boolean): Promise<Recipe> {
    const data = await fetch(`${this.urlRecipes}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        "favorite": value,
      }),
    });
    return await data.json() ?? {};
  }
}
