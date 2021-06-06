import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //setup listener - get informed about any changes
    this.recipeService.recipeSelected.subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
      );
      //TODO: update url with currently selected name of recipe
      // this.route.params.subscribe(
      //   (params: Params) => {
      //     this.selectedRecipe.name = params['name'];
      //   }
      // );
  }

}
