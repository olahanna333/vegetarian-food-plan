import { Component, inject } from '@angular/core';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ CommonModule, RecipePreviewComponent],
  template: `
    <section class="recipesList">
      @for (recipe of recipeList; track recipe.id) {
        <app-recipe-preview [recipe]="recipe" (getFavoriteRecipes)="getFavoriteRecipes()"></app-recipe-preview>
      }
      <!-- <app-recipe-preview *ngFor="let recipe of recipeList" [recipe]="recipe" (getFavoriteRecipes)="getFavoriteRecipes()"></app-recipe-preview> -->
    </section>
  `,
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  recipeList: Recipe[] = [];
  recipeService: RecipeService = inject(RecipeService);

  constructor() {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes() {
    this.recipeService.getAllRecipes().then((recipeList: Recipe[]) => {
      this.recipeList = recipeList.filter((recipe) => recipe.favorite == true);
    });
  }

}
