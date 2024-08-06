import { Component, Input, inject, OnChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef }from '@angular/material/dialog';
import { Plan } from '../../plan';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';
import { RecipePreviewComponent } from "../../recipe-preview/recipe-preview.component";

@Component({
  selector: 'app-daily-meals',
  standalone: true,
  imports: [MatButtonModule, NgIf, RecipePreviewComponent],
  template: `
    <article *ngIf="plan">
      <div class="menu-header">
        <h2>{{ plan.day }}</h2>
        <div class="button">
            <button (click)="openDialog()">Modify</button>
        </div>
      </div>
      <div class="daily-menu">
        <app-recipe-preview [recipe]="breakfast" />
        <app-recipe-preview [recipe]="lunch" />
        <app-recipe-preview [recipe]="dinner" />
      </div>
    </article>
  `,
  styleUrl: './daily-meals.component.css'
})
export class DailyMealsComponent {
  @Input({ required: true }) plan!: Plan;
  recipeService: RecipeService = inject(RecipeService);
  breakfast: Recipe | undefined;
  lunch: Recipe | undefined;
  dinner: Recipe | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnChanges() {
    if(this.plan != undefined) {
      let breakfastId = Number (this.plan.breakfast);
      let lunchId = Number(this.plan.lunch);
      let dinnerId = Number(this.plan.dinner);

      if(breakfastId >= 0) {
        this.recipeService.getRecipeById(breakfastId).then(recipe => {
          this.breakfast = recipe;
        });
      } else {
        this.breakfast = undefined;
      }
      
      if(lunchId >= 0) {
        this.recipeService.getRecipeById(lunchId).then(recipe => {
          this.lunch = recipe;
        });
      } else {
        this.lunch = undefined;
      }

      if(dinnerId >= 0) {
        this.recipeService.getRecipeById(dinnerId).then(recipe => {
          this.dinner = recipe;
        });
      } else {
        this.dinner = undefined;
      }
    }  
  }

  openDialog() {
    this.dialog.open(MenuDialogComponent, {
      data: {
        plan: this.plan,
        breakfast: this.breakfast,
        lunch: this.lunch,
        dinner: this.dinner
      },
      maxWidth: '100%',
    }).afterClosed().subscribe(item => {
      this.plan = item.plan;
      this.ngOnChanges();
    });
  }
}
