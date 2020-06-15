import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
// import {Subject} from 'rxjs';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // tslint:disable-next-line:variable-name
  // private _recipeSelected = new Subject <Recipe>();
//     recipes: Recipe[] = [  new Recipe('A Test Recipe ',
//       'simple Test Recipe',
// tslint:disable-next-line:max-line-length
//       'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg'
//     , [new Ingredient('Meat', 1),
//         new  Ingredient('franch fries', 1)]),
//   new Recipe('A Test Recipe ',
//     'simple Test Recipe',
// tslint:disable-next-line:max-line-length
//     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg'
//   , [new Ingredient('Buns', 2),
//     new Ingredient('Meat', 1)])
// ];
  recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService){}
    getRecipes(){
      return this.recipes.slice();
    }

  // get recipeSelected(): Subject<Recipe> {
  //   return this._recipeSelected;
  // }
  getRecipe(index: number){
      return this.recipes[index];
  }
  addIngredientToShoppingList(ingredient: Ingredient[]){
      this.slService.addIngredients(ingredient);
  }
  addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
  }
  updateRacipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
  }
}
