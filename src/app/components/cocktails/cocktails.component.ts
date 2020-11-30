import { Component, OnInit } from "@angular/core";
import { EntityService } from "src/app/services/entity.service";
import * as _ from "underscore";
import * as async from "async";
import { Cocktails } from "src/app/_class/cocktails/cocktails";
import { Ressource } from "src/app/_class/ressource/ressource";
import { Ressourcescocktails } from "src/app/_class/ressourcescocktails/ressourcescocktails";
import { Views } from "src/app/_class/views/views";
import { Users } from "src/app/_class/users/users";
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
import { ConfirmDialogModule, ConfirmationService } from "primeng";

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {
  public cocktails: Array<Cocktails> = [];
  public ressources: Array<Ressource> = [];
  public ressourcescocktails: Array<Ressourcescocktails> = [];
  public views: Array<Views> = [];
  public selected: Cocktails = null;
  public displayCocktail = false;
  public displayCocktailCreate = false;
  public displaySingleCocktail = false;
  public cocktailsData: Object;
  public fetchCocktail: Cocktails;
  public modified: Cocktails;
  public modified2
  public tempArray = [];
  public dialogloaded = false;
  public action: string = null;
  public cocktailsForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    isAlcohol: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required,isNumberValidator]),
    difficulty: new FormControl(null, [Validators.required,isNumberValidator]),
    degree: new FormControl(null, isFloatValidator),
    volume: new FormControl(null, isNumberValidator),
    instructions: new FormControl(null, Validators.required),
    ressourcescocktails: new FormArray([]),
  });
  public arrayofcocktails: Array<Array<any>> = [];

  public selectedType: number = 0;
  public types: Array<any> = [
    { label: "Tous", value: 0 },
    { label: "Top All-time", value: 1 },
    { label: "Top Mensuel", value: 2 },
    { label: "Incontournables", value: 3 },
  ];

  public buttons = [
    {
      text: "Créer",
      tooltip: "Créer un nouveau cocktail",
      skin: "btn-sm secondary",
      click: () => {
        console.log("Créer un nouveau cocktail")
        this.router.navigateByUrl(':entity/newcocktail')
      }
    }
  ];

  constructor(
    public entityService: EntityService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private data: DataService,
    private formBuilder: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    console.log(this.selectedType)
    
    async.waterfall(
      [
        c => {
          this.entityService.get("/cocktails").subscribe((res: any) => {
            const _res = _.isArray(res) ? res : [];
            this.cocktails = _res.map(r => new Cocktails(r));
            this.cocktails.map(x => {
              x.viewsalltime=0
              x.viewsmonthly=0
              if(x.degree!=null){
                x.degree2=x.degree+"°"
              }else{x.degree2="Non renseigné"}
              if(x.isAlcohol===true){x.isAlcohol2="Oui"}
              else{x.isAlcohol2="Non"}
            })
            console.log("Cocktails: ", _res);
            c(null)
          });
        },
        c =>{
          this.entityService.get("/views").subscribe((res: any) => {
            const _res = _.isArray(res) ? res : [];
            this.views = _res.map(r => new Views(r));
            console.log("Views: ", this.views);
            c(null)
          });
        },
        c =>{
          this.cocktails.map(x=>{
            this.views.map(y => {
              if(y.cocktailId!=null && x.id==+y.cocktailId){
                x.viewsalltime=x.viewsalltime+1
              }
            })
          })
          this.cocktails.map(x=>{
            this.views.map(y => {
              if(y.cocktailId!=null && x.id==+y.cocktailId && new Date(y.date)<new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)){
                x.viewsmonthly=x.viewsmonthly+1
              }
            })
          })
          c(null)
        },
        c =>{
          function comparemonthly( a, b ) {
            if ( a.viewsmonthly > b.viewsmonthly ){
              return -1;
            }
            if ( a.viewsmonthly < b.viewsmonthly ){
              return 1;
            }
            return 0;
          }

          function comparealltime( a, b ) {
            if ( a.viewsalltime > b.viewsalltime ){
              return -1;
            }
            if ( a.viewsalltime < b.viewsalltime ){
              return 1;
            }
            return 0;
          }

          if(this.selectedType==0){
            console.log(this.cocktails)
          }
          if(this.selectedType==1){
            this.cocktails.sort( comparealltime );
            console.log(this.cocktails)
          }
          if(this.selectedType==2){
            this.cocktails.sort( comparemonthly );
            console.log(this.cocktails)
          }
          c(null)
        }
      ],
      () => {
      }
    );
  }

  showDialog($event, node: Cocktails) {
    $event.stopPropagation();
    this.selected = node;
    this.displayCocktail = true;
  }

  deleteCocktail(cocktail) {
    console.log(
      "To delete :",
      cocktail.id
    );
    async.waterfall(
      [
        c => {
          this.data
            .deleteCocktail(
              this.entityService.entity,
              cocktail.id
            )
            .subscribe(
              res => {
                this.load();
                this.cocktailsData = res;
                console.log("Supprimé! :", res, this.cocktailsData);
                c(null);
              },
              err => {
                console.log(err);
              }
            );
        }
      ],
      () => {
        this.toastr.success('Cocktail supprimé', 'Notification');
        this.displayCocktail = false;
        this.load();
      }
    );
  }

  showDialogUpdate(node: Cocktails) {
    this.initform();
    this.modified2 = [];
    this.modified = null;
    console.log("node:",node)
    this.dialogloaded = false;
    this.cocktailsForm.controls.ressourcescocktails.setValue([]);
    if (node instanceof Cocktails) {
      this.data
        .fetchCocktail(this.entityService.entity, node.id)
        .subscribe((res: any) => {
          async.waterfall(
            [
              (c) => {
                this.entityService.get("/ressourcescocktails").subscribe((res2: any) => {
                  const _res2 = _.isArray(res2) ? res2 : [];
                  this.ressourcescocktails = _res2.map(r2 => new Ressourcescocktails(r2));
                  console.log("Ressourcescocktails: ", _res2);
                  c(null)
                });
              },
              c => {
                this.fetchCocktail = new Cocktails(res);
                console.log("Check ingredients:", this.fetchCocktail);
                this.ressourcescocktails.map(y=>{
                if(this.fetchCocktail.id==y.cocktailId){
                  // this.fetchCocktail.ingredients.push(y.ressourceId);
                }
                console.log("Check ingredients:", this.fetchCocktail);
                })
                c(null)
              },
              c => {
                const temp = {
                  id:this.fetchCocktail.id,
                  name: this.fetchCocktail.name,
                  isAlcohol: this.fetchCocktail.isAlcohol,
                  price: this.fetchCocktail.price,
                  difficulty: this.fetchCocktail.difficulty,
                  degree: this.fetchCocktail.degree,
                  volume: this.fetchCocktail.volume,
                  instructions: this.fetchCocktail.instructions
                }
                console.log("temp to put :", temp);
                this.cocktailsForm.patchValue(temp);
                c(null)
              },
              c => {
                // if (res) {
                //   if (this.fetchCocktail.ingredients.length > 0) {
                //     console.log("ingredients", this.fetchCocktail.ingredients);
                //     this.fetchCocktail.ingredients.map((m) => {
                //       this.patchForm(m);
                //     });
                //   }
                // }
                // this.modified = this.fetchCocktail;
                this.dialogloaded = true;
                c(null)
              },
            ],
            () => {
            }
          );
          
        });
      this.displayCocktailCreate = true;
      this.action = "update";
    } else {
      alert("Attention, c'est pas un objet de type Cocktails");
    }
  }

  patchForm = (item?: any) => {
    console.log(item);
    //Je recois que l'id, me faut l'objet entier?
    let ctrl = <FormArray>this.cocktailsForm.controls.ressourcescocktails;
    ctrl.push(
      this.formBuilder.group({
        ressourcescocktails: item.ressourcescocktails,
        isFacultative: item.isFacultative,
        isVariation: item.isVariation,
        quantity: item.quantity
      })
    );
  };

  initform(){
    this.cocktailsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      isAlcohol: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required,isNumberValidator]),
      difficulty: new FormControl(null, [Validators.required,isNumberValidator]),
      degree: new FormControl(null, isFloatValidator),
      volume: new FormControl(null, isNumberValidator),
      instructions: new FormControl(null, Validators.required),
      ressourcescocktails: new FormArray([]),
    })
  }

  updateCocktail() {
    console.log(
      "To push",
      this.entityService.entity,
      this.modified.id,
      this.cocktailsForm.value
    );
    async.waterfall(
      [
        c => {
          this.data
            .putCocktail(
              this.entityService.entity,
              this.modified.id,
              this.cocktailsForm.value
            )
            .subscribe(
              res => {
                this.load();
                this.cocktailsData = res;
                console.log(res, this.cocktailsData);
                c(null);
              },
              err => {
                console.log(err);
              }
            );
        }
      ],
      () => {
        this.toastr.success('Cocktail mis à jour', 'Notification');
        this.displayCocktail = false;
        this.displayCocktailCreate = false;
        this.load();
      }
    );
  }

  showCocktail($event, node: Cocktails){
    console.log("Cocktail:",node)
    $event.stopPropagation();
    this.selected = node;
    this.displaySingleCocktail = true;
    const temp = {
      date: moment().toDate(),
      cocktailId: this.selected.id,
    }
    this.data
      .postView(this.entityService.entity, temp)
      .subscribe(
        (res) => {
          console.log("Vue créée", res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  switchValid = (selected: any) => {
        console.log("selected:", selected);
        const tempId = selected.id;
        console.log("tempId", tempId);

        this.data.fetchCocktail(this.entityService.entity, tempId).subscribe(
          (res: Cocktails) => {
            console.log("Cocktail récuperé", res);
            if (res.isValidated == false) {
              if (
                (selected.isValidated = '"<i class="fa fa-times text-danger"></i>"')
              ) {
                console.log("Cocktail a valider");
                res.isValidated = true;
                this.data
                  .putCocktail(this.entityService.entity, tempId, res)
                  .subscribe(
                    (res) => {
                      this.toastr.success("Cocktail validé!");
                      console.log("Cocktail validé", res);
                      this.load();
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
              } else if (
                (selected.isValidated = '"<i class="fa fa-times text-success"></i>"')
              ) {
                this.toastr.warning("Cocktail déja invalide!");
                console.log("Cocktail déja invalide");
                this.load();
              }
            } else {
              if (
                (selected.isValidated = '"<i class="fa fa-times text-danger"></i>"')
              ) {
                console.log("Cocktail à invalider");
                res.isValidated = false;
                this.data
                  .putCocktail(this.entityService.entity, tempId, res)
                  .subscribe(
                    (res) => {
                      this.toastr.success("Cocktail invalidé!");
                      console.log("Cocktail invalidé", res);
                      this.load();
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
              } else if (
                (selected.isValidated = '"<i class="fa fa-times text-success"></i>"')
              ) {
                this.toastr.warning("Cocktail déja valide!");
                console.log("Cocktail déja valide");
                this.load();
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    };
};
