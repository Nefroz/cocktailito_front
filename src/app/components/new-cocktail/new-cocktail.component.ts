import { Component, OnInit } from "@angular/core";
import { EntityService } from "src/app/services/entity.service";
import * as _ from "underscore";
import * as async from "async";
import { Ressource } from "src/app/_class/ressource/ressource";
import { Users } from "src/app/_class/users/users";
import { Cocktails } from "src/app/_class/cocktails/cocktails";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { DataService } from "../../services/data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { isNumberValidator } from "../../validators/isNumberValidator";
import { isCharacterOrAccentValidator } from "../../validators/isCharacterOrAccentValidator";
import { isFloatValidator } from "../../validators/isFloatValidator";
import { isLessThanSixCharactersValidator } from "../../validators/isLessThanSixCharactersValidator";
import { User } from "super-compos";

@Component({
  selector: 'app-new-cocktail',
  templateUrl: './new-cocktail.component.html',
  styleUrls: ['./new-cocktail.component.scss']
})
export class NewCocktailComponent implements OnInit {
  public cocktailsData: Cocktails;
  public modified2: Array<Cocktails> = [];
  public ingredientsLV: Array<any> = [];
  public arrayIngredientsID: Array<number> = [];
  public dataToSave: Object = {};
  public cocktails: Array<Cocktails> = [];

  public cocktailsForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    isAlcohol: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required,isNumberValidator]),
    difficulty: new FormControl(null, [Validators.required,isNumberValidator]),
    degree: new FormControl(null, isFloatValidator),
    volume: new FormControl(null, isNumberValidator),
    instructions: new FormControl(null, Validators.required),
    ingredients: new FormArray([]),
  });

  constructor(
    public entityService: EntityService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private data: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cocktailsForm.patchValue({isAlcohol: "1"});
    this.entityService.get("/cocktails").subscribe((res: any) => {
      const _res = _.isArray(res) ? res : [];
      this.cocktails = _res.map((r) => new Cocktails(r));
      console.log("Cocktails",this.cocktails);
    });
    console.log("check",this.cocktailsForm.value)
    this.data
      .fetchRessources(this.entityService.entity)
      .subscribe((res: any) => {
        const _res = _.isArray(res) ? res : [];
        _res.map((x) => {
          this.ingredientsLV.push({
            label: x.name + " (" + x.id + ")",
            value: x.id,
          });
        });
        console.log("Ingredients fetched: ", this.ingredientsLV);
      });
  }

  createCocktail() {
    this.cocktailsForm.value.isValidated="0";
    async.waterfall(
      [
        (c) => {
            this.data
            .postCocktail(this.entityService.entity, this.cocktailsForm.value)
            .subscribe(
              res => {
                this.cocktailsData = res;
                console.log("cocktailData",this.cocktailsData);
                c(null);
              },
              err => {
                console.log(err);
              }
            );
        },
        (c) => {
          const ingredients = this.cocktails.length + 1;
          this.arrayIngredientsID = [];
          this.cocktailsForm.value.ingredients.map((item) => {
            if (item.ingredients !== "" && item.ingredients > 0) {
              this.arrayIngredientsID.push(item.ingredients);
            }
          });
          console.log("check ingredientsss",this.cocktailsData)
          this.arrayIngredientsID.map((ingredients) => {
            console.log("ingredient value",ingredients)
            this.dataToSave = {
              cocktailId:this.cocktailsData.id,
              ressourceId: ingredients,
            };
            this.data
              .postRessourceCocktail(this.entityService.entity, this.dataToSave)
              .subscribe(
                (res) => {
                  this.cocktailsData = res;
                  console.log(res, this.cocktailsData);
                },
                (err) => {
                  console.log(err);
                }
              );
          });
          c(null);
      },
        (c) => {
          this.toastr.success('Nouveau cocktail proposé', 'Notification');
          this.router.navigateByUrl(':entity/cocktails')
          c(null)
      },
      ],
      () => {
      }
    );
  }

  get ingredients() {
    return <FormArray>this.cocktailsForm.get("ingredients");
  }

  get IngredientArray(): FormArray {
    return this.cocktailsForm.get("ingredients") as FormArray;
  }

  addIngredient(): void {
    let addfoo = this.formBuilder.group({
      ingredients: "",
    });
    this.IngredientArray.push(addfoo);
    this.modified2.length++;
  }

  removeIngredient(i): void {
    if (this.IngredientArray.length > 1) {
      this.IngredientArray.removeAt(i);
    }
  }

}
