import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
    <section *ngIf="recipe" class="card">
      <a [routerLink]="['/details', recipe.id]">
        <img class="card-photo" [src]="recipe.photo" alt="Photo of {{recipe.name}}">
        <h2 class="card-title">{{recipe.name}}</h2>
        <p>Duration: {{recipe.prepTime}}</p>
        <p>Portion: {{recipe.portionNumber}}</p>
        <!-- icons: https://www.svgrepo.com/ -->
      </a>
      <div class="icon-{{recipe.favorite}}" (click)="changeFavorite(recipe)"></div>
    </section>
  `,
  styleUrl: './recipe-preview.component.css'
})
export class RecipePreviewComponent {
  @Input() recipe!: Recipe | undefined;
  @Output() getFavoriteRecipes = new EventEmitter<void>();
  recipeService: RecipeService = inject(RecipeService);

  remoteFavorite() {
    this.getFavoriteRecipes.emit();
  }

  changeFavorite(data: Recipe) {
    this.recipeService.changeFavoriteValue(data.id, !(data.favorite)).then((newRecipe: Recipe) => {
      this.recipe = newRecipe;
      this.remoteFavorite();
    });
  }
}
