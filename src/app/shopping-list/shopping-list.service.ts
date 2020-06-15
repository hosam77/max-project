import {Ingredient} from '../shared/ingredient.model';
// import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService {

  // ingredientsChange = new EventEmitter<Ingredient[]>();
  ingredientsChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  // tslint:disable-next-line:variable-name
    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
    getIngrediens(){
    return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChange.next(this.ingredients.slice());
  }
  getIngredient(index: number){
      return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientsChange.next(this.ingredients.slice());
  }
  deleteIngredient(index: number){
      this.ingredients.splice(index, 1);
      this.ingredientsChange.next(this.ingredients.slice());
  }

}
