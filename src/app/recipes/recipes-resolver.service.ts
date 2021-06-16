import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService) {}

  //Angular runs the resolver before loading a specific route to ensure data the route needs is available
  //F.e. loading a recipe item to edit
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipesService.getRecipes();

    //check if there are recipes and only fetch new ones if we don't, otherwise they get overwritten before they get saved
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }else {
      return recipes;
    }
  }
}
