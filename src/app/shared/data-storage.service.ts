import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private  http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put('https://angular-max-project-5c450.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
        return this.http.get<Recipe[]>('https://angular-max-project-5c450.firebaseio.com/recipes.json')
          .pipe(
      map(recipes => {
        // tslint:disable-next-line:no-shadowed-variable
       return recipes.map(recipes => {
          return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []};
        });
      }), tap(recipe => {
        this.recipeService.setRecipes(recipe);
      }));
  }
}
