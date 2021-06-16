import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService) {}

  //Resolver runs code before a route is loaded  to ensure that the data the route depends on is there
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipesService.getRecipes();

    //check if there are recipes and only fetch new ones if we don't
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }else {
      return recipes;
    }
  }
}
