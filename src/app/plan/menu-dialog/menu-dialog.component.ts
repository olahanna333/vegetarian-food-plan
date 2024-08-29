import { Component, Inject, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Recipe } from '../../recipe';
import { Plan } from '../../plan';
import { RecipeService } from '../../recipe.service';
import { PlanService } from '../../plan.service';
import { CdkDropListElementComponent } from "../cdk-drop-list-element/cdk-drop-list-element.component";

@Component({
  selector: 'app-menu-dialog',
  standalone: true,
  imports: [CommonModule, CdkDropListElementComponent, MatDialogTitle, MatDialogContent, MatDialogActions, CdkDropListGroup, CdkDropList, CdkDrag],
  template: `
  <article *ngIf="data.plan" class="dialog">
    <h1 mat-dialog-title>Modify {{ data.plan.day }} Menu</h1>
    <mat-dialog-content>
      <div class="dialog-grid" cdkDropListGroup>
        <app-cdk-drop-list-element 
          [recipes]="recipes" 
          [title]="'Recipes'" 
          [className]="'list'" 
          class="recipes">
        </app-cdk-drop-list-element>
        <app-cdk-drop-list-element 
          [recipes]="breakfast" 
          [title]="'Breakfast'" 
          [className]="'menu'" 
          class="breakfast">
        </app-cdk-drop-list-element>
        <app-cdk-drop-list-element 
          [recipes]="lunch" 
          [title]="'Lunch'" 
          [className]="'menu'" 
          class="lunch">
        </app-cdk-drop-list-element>
        <app-cdk-drop-list-element 
          [recipes]="dinner" 
          [title]="'Dinner'" 
          [className]="'menu'" 
          class="dinner">
        </app-cdk-drop-list-element>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions class="buttons">
      <button (click)="saveChanges()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </mat-dialog-actions>
  </article>
  `,
  styleUrl: './menu-dialog.component.css'
})
export class MenuDialogComponent {
  recipes: Recipe[] = [];
  breakfast: Recipe[] = [];
  lunch: Recipe[] = [];
  dinner: Recipe[] = [];
  recipeService: RecipeService = inject(RecipeService);
  planService: PlanService = inject(PlanService);
  dataItem: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {plan: Plan, breakfast: Recipe, lunch: Recipe, dinner: Recipe}, public dialogRef: MatDialogRef<MenuDialogComponent>) {
    this.recipeService.getAllRecipes().then((recipeList: Recipe[]) => {
      this.recipes = recipeList;

      if(this.data.plan.breakfast >= 0) {
        this.breakfast.push(this.data.breakfast);
        this.recipes = this.recipes.filter(item => item.id != this.data.breakfast.id);
      }

      if(this.data.plan.lunch >= 0) {
        this.lunch.push(this.data.lunch);
        this.recipes = this.recipes.filter(item => item.id != this.data.lunch.id);
      }

      if(this.data.plan.dinner >= 0) {
        this.dinner.push(this.data.dinner);
        this.recipes = this.recipes.filter(item => item.id != this.data.dinner.id);
      }
    });
    this.dataItem = this.data;
  }

  ngOnChanges(){
    if(this.data.plan.breakfast >= 0) {
      this.breakfast.push(this.data.breakfast);
      this.recipes = this.recipes.filter(item => item.id != this.data.breakfast.id);
    }

    if(this.data.plan.lunch >= 0) {
      this.lunch.push(this.data.lunch);
      this.recipes = this.recipes.filter(item => item.id != this.data.lunch.id);
    }

    if(this.data.plan.dinner >= 0) {
      this.dinner.push(this.data.dinner);
      this.recipes = this.recipes.filter(item => item.id != this.data.dinner.id);
    }
  }

  checkPlan(meal: Recipe[]) {
    let recipeId: Number;
    if(meal.length == 0) {
      recipeId = -1;
    } else {
      recipeId = Number(meal[0].id);
    }
    return recipeId;
  }

  saveChanges(): void {
    this.planService.changePlan(
      this.data.plan.id,
      {
        "breakfast": this.checkPlan(this.breakfast),
        "lunch": this.checkPlan(this.lunch),
        "dinner": this.checkPlan(this.dinner)
      }
    ).then((newPlan: Plan) => {
      this.data.plan = newPlan;
      this.dialogRef.close(this.dataItem);
    })
  }

  cancel(): void {
    this.dialogRef.close(this.dataItem);
  }
}
