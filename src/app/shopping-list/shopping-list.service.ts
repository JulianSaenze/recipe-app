import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients() {
          //make a copy of array
        return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        //   for (let ingredient of ingredients) {
        //       this.addIngredient
        //   }

        //spread-operator (...): to transform an array into a list, where single items are pushed to the other array
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        //splice: start at the index and cut it out
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }


}
