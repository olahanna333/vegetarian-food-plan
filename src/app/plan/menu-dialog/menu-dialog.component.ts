import { Component, Inject, inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Recipe } from '../../recipe';
import { Plan } from '../../plan';
import { RecipeService } from '../../recipe.service';
import { PlanService } from '../../plan.service';

@Component({
  selector: 'app-menu-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, CdkDropListGroup, CdkDropList, CdkDrag],
  template: `
  <article class="dialog">
    <h1 mat-dialog-title>Modify {{ data.plan.day }} Menu</h1>
    <mat-dialog-content>
      <div class="dialog-grid" cdkDropListGroup>
        <div class="example-container recipes">
          <h3>Recipes</h3>

          <div
            cdkDropList
            [cdkDropListData]="recipes"
            class="list"
            (cdkDropListDropped)="drop($event)">
            @for (item of recipes; track item) {
              <div id="{{item.id}}" class="example-box" cdkDrag>
                {{item.name}}
                <img class="photo" [src]="item.photo" alt="Photo of {{item.name}}">
              </div>
            }
          </div>
        </div>

        <div class="example-container breakfast">
          <h3>Breakfast</h3>

          <div
            cdkDropList
            [cdkDropListData]="breakfast"
            class="menu"
            (cdkDropListDropped)="drop($event)">
            @for (item of breakfast; track item) {
              <div id="{{item.id}}" class="example-box" cdkDrag>
                {{item.name}}
                <img class="photo" [src]="item.photo" alt="Photo of {{item.name}}">
              </div>
            }
          </div>
        </div>

        <div class="example-container lunch">
          <h3>Lunch</h3>

          <div
            cdkDropList
            [cdkDropListData]="lunch"
            class="menu"
            (cdkDropListDropped)="drop($event)">
            @for (item of lunch; track item) {
              <div id="{{item.id}}" class="example-box" cdkDrag>
                {{item.name}}
                <img class="photo" [src]="item.photo" alt="Photo of {{item.name}}">
              </div>
            }
          </div>
        </div>

        <div class="example-container dinner">
          <h3>Dinner</h3>

          <div
            cdkDropList
            [cdkDropListData]="dinner"
            class="menu"
            (cdkDropListDropped)="drop($event)">
            @for (item of dinner; track item) {
              <div id="{{item.id}}" class="example-box" cdkDrag>
                {{item.name}}
                <img class="photo" [src]="item.photo" alt="Photo of {{item.name}}">
              </div>
            }
          </div>
        </div>
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

  drop(event: CdkDragDrop<Recipe[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(event.container.data.length != 1 ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
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
