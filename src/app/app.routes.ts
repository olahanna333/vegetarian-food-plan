import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { DashboardComponent } from './plan/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        title: 'Recipes'
    },
    {
        path: 'favorite',
        component: FavoriteComponent,
        title: 'Favorite Recipes'
    },
    {
        path: 'details/:id',
        component: RecipeDetailsComponent,
        title: 'Recipes Details'
    },
    {
        path: 'plan',
        component: DashboardComponent,
        title: 'My Plan'
    },
];
