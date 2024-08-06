import { Component, inject } from '@angular/core';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

//  source of recipes: www.bbcgoodfood.com

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipePreviewComponent],
  template: `
    <section class="recipesList">
      @for (recipe of recipeList; track recipe.id) {
        <app-recipe-preview [recipe]="recipe"></app-recipe-preview>
      }
    </section>
  `,
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipeList: Recipe[] = [];
  recipeService: RecipeService = inject(RecipeService);
  cardClass = "card";

  constructor() {
    this.recipeService.getAllRecipes().then((recipeList: Recipe[]) => {
      this.recipeList = recipeList;
    });
  }
}
