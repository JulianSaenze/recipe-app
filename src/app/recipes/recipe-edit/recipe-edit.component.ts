import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  //to know if a new recipe is created (false) or an existing recipe is edited (true)
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //check whenever parameters change
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //assign value of the following check - checking in which mode we currently are
          this.editMode = params['id'] != null;
        }
      );
  }

}
