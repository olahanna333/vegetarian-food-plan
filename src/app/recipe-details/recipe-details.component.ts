import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  template: `
      <section class="recipe-content">
        <div>
          <h1 class="recipe-name">{{ recipe?.name }}</h1>
          <div class="recipe-description">
            <div class="recipe-ingred-box">
              <div class="recipe-ingred">
                <h3>Ingredients:</h3>
                @for (ingredient of recipe?.ingredients; track recipe?.ingredients) {
                  <div class="ingred">
                    {{ingredient.quantity}}{{ingredient.unit}}
                    {{ingredient.ingredientName}}
                  </div>
                }
              </div>
            </div>
            <div class=recipe-methods>
              @for (method of recipe?.methods; track recipe?.methods; let idx = $index) {
                  <h3>STEP {{ idx + 1 }}:</h3>
                  {{ method }}
              }
            </div>
          </div>
        </div>
        <div>
          <img class="recipe-photo" [src]="recipe?.photo">
          <div class="recipe-other-details recipe-other-details-box">
            <span class="duration"></span>
            {{recipe?.prepTime}}
          </div>
          <div class="recipe-other-details">
            <span class="portion"></span>
            {{recipe?.portionNumber}} portion
          </div>
        </div>
      </section>
  `,
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeService: RecipeService = inject(RecipeService);
  recipe: Recipe | undefined;

  constructor() {
    const recipeId = Number (this.route.snapshot.params['id']);
    this.recipeService.getRecipeById(recipeId).then(recipe => {
      this.recipe = recipe;
    });
  }
}
