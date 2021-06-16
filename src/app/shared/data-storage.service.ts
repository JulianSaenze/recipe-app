import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService{
  url = 'https://ng-recipe-book-44aae-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  constructor(private http: HttpClient, private recipesService: RecipeService){}

  //post vs put: post creates ID from Angular. put assumes you know what you are putting and create normal array indexes
  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.url, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  //pipe(map()) is a rxjs operator, recipes.map() is a js array method
  //pipe(map()) transforms elements in an array, takes anonymous function which is executed for every element in the array (for every recipe)
  //and return the transformed recipe. Second return, should return the original recipe, but if that recipe does not have an ingredients array
  //set the ingredients to an empty array instead
  fetchRecipes(){
    return this.http
      .get<Recipe[]>(this.url)
      //make sure that data that is loaded has ingredients and is not undefined / at least has an empty ingredients array
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          //...recipe -> to copy existing data, set ingredients equal to wether recipe.ingredients is true (has elements), else set it to an empty array
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
        console.log(recipes);
      })
      );
  }

}
