import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
  url = 'https://ng-recipe-book-44aae-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService){}

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
    //take is called as a function and pass a number. Only take one value from that Observable and after that automatically unsubscribe
    //operator exhaustMap - waits for the first user observable to complete, after gives that user, gets data from the previous observable, return a new
    //observable in it and replace the previous observable in the entire observable chain
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
      return this.http
        .get<Recipe[]>(this.url, {
          params: new HttpParams().set('auth', user.token)
        })
      }),
      map(recipes => {
        return recipes.map(recipe => {
          //...recipe -> to copy existing data, set ingredients equal to wether recipe.ingredients is true (has elements), else set it to an empty array
          //make sure that data that is loaded has ingredients and is not undefined / at least has an empty ingredients array
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
