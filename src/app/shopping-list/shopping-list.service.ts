import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients() {
          //make a copy of array
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.emit(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        //   for (let ingredient of ingredients) {
        //       this.addIngredient
        //   }

        //spread-operator (...): to transform an array into a list, where single items are pushed to the other array
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }
}