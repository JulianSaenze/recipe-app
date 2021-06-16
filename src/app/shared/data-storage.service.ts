import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
  url = 'https://ng-recipe-book-44aae-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  constructor(private http: HttpClient, private recipesService: RecipeService){}

  //post vs put: post creates ID from Angular. put assumes you what you are putting (normal array indexes)
  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.url, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

}
