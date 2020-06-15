import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  // tslint:disable-next-line:indent
	public name: string;
  // tslint:disable-next-line:indent
	public description: string;
  // tslint:disable-next-line:indent
	public  imagePath: string;
  // tslint:disable-next-line:indent
	public ingredients: Ingredient[];

  // tslint:disable-next-line:indent
	constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
    // tslint:disable-next-line:indent
		this.name = name;
    // tslint:disable-next-line:indent
		this.description = desc;
    // tslint:disable-next-line:indent
		this.imagePath = imagePath;
    // tslint:disable-next-line:indent
  this.ingredients = ingredients;
    // tslint:disable-next-line:indent
	}
}
