import { Component, OnInit } from "@angular/core";
import { EntityService } from "src/app/services/entity.service";
import * as _ from "underscore";
import * as async from "async";
import { Ressource } from "src/app/_class/ressource/ressource";
import { Users } from "src/app/_class/users/users";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.scss']
})
export class RessourcesComponent implements OnInit {
  public ressources: Array<Ressource> = [];
  public selected: Ressource = null;
  public displayRessource = false;
  public displayRessourceCreate = false;
  public ressourceData: Object;
  public fetchRessource: Ressource;
  public modified: Ressource;
  public dialogloaded = false;
  public action: string = null;
  public ressourcesForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    typeofquantity: new FormControl(null, Validators.required),
    toFactorize: new FormControl(null, Validators.required),
  });

  public buttons = [
    {
      text: "Créer",
      tooltip: "Créer une nouvelle ressource",
      skin: "btn-sm secondary",
      click: () => {
        console.log("Créer une nouvelle ressource")
        this.router.navigateByUrl(':entity/newressource')
      }
    }
  ];

  constructor(
    public entityService: EntityService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private data: DataService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.entityService.get("/ressources").subscribe((res: any) => {
      const _res = _.isArray(res) ? res : [];
      this.ressources = _res.map(r => new Ressource(r));
      console.log("Ressources: ", this.ressources);
      this.ressources.map(x => {
        if(x.toFactorize=="1"){x.toFactorize2="Oui"}
        else{x.toFactorize2="Non"}
      })
    });
  }

  showDialog($event, node: Ressource) {
    $event.stopPropagation();
    this.selected = node;
    this.displayRessource = true;
  }

  deleteRessource(ressource) {
    console.log(
      "To delete :",
      ressource.id
    );
    async.waterfall(
      [
        c => {
          this.data
            .deleteRessource(
              this.entityService.entity,
              ressource.id
            )
            .subscribe(
              res => {
                this.load();
                this.ressourceData = res;
                console.log("Supprimé! :", res, this.ressourceData);
                c(null);
              },
              err => {
                console.log(err);
              }
            );
        }
      ],
      () => {
        this.toastr.success('Ressource supprimée', 'Notification');
        this.displayRessource = false;
        this.load();
      }
    );
  }

  showDialogUpdate(node: Ressource) {
    this.initform();
    console.log(node)
    this.dialogloaded = false;
    if (node instanceof Ressource) {
      this.data
        .fetchRessource(this.entityService.entity, node.id)
        .subscribe((res: any) => {
          this.fetchRessource = new Ressource(res);
          const temp = {
            name: this.fetchRessource.name,
            typeofquantity: this.fetchRessource.typeofquantity,
            toFactorize: this.fetchRessource.toFactorize,
          }

          if (res) {
            console.log("temp to put :", temp);
            this.ressourcesForm.patchValue(temp);
            this.modified = this.fetchRessource;
            this.dialogloaded = true;
          }
        });
      this.displayRessourceCreate = true;
      this.action = "update";
    } else {
      alert("Attention, c'est pas un objet de type Ressource");
    }
  }

  initform(){
    this.ressourcesForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      typeofquantity: new FormControl(null, Validators.required),
      toFactorize: new FormControl(null, Validators.required),
    });
  }

  updateRessource() {
    console.log(
      "To push",
      this.entityService.entity,
      this.modified.id,
      this.ressourcesForm.value
    );
    async.waterfall(
      [
        c => {
          this.data
            .putRessource(
              this.entityService.entity,
              this.modified.id,
              this.ressourcesForm.value
            )
            .subscribe(
              res => {
                this.load();
                this.ressourceData = res;
                console.log(res, this.ressourceData);
                c(null);
              },
              err => {
                console.log(err);
              }
            );
        }
      ],
      () => {
        this.toastr.success('Ressource mise à jour', 'Notification');
        this.displayRessource = false;
        this.displayRessourceCreate = false;
        this.load();
      }
    );
  }

  switchValid = (selected: any) => {
    console.log("selected:", selected);
    const tempId = selected.id;
    console.log("tempId", tempId);

    this.data.fetchRessource(this.entityService.entity, tempId).subscribe(
      (res: Ressource) => {
        console.log("Ressource récuperé", res);
        if (res.isValidated == false) {
          if (
            (selected.isValidated = '"<i class="fa fa-times text-danger"></i>"')
          ) {
            console.log("Ressource a valider");
            res.isValidated = true;
            this.data
              .putRessource(this.entityService.entity, tempId, res)
              .subscribe(
                (res) => {
                  this.toastr.success("Ressource validée!");
                  console.log("Ressource validée", res);
                  this.load();
                },
                (err) => {
                  console.log(err);
                }
              );
          } else if (
            (selected.isValidated = '"<i class="fa fa-times text-success"></i>"')
          ) {
            this.toastr.warning("Ressource déja invalide!");
            console.log("Ressource déja invalide");
            this.load();
          }
        } else {
          if (
            (selected.isValidated = '"<i class="fa fa-times text-danger"></i>"')
          ) {
            console.log("Ressource à invalider");
            res.isValidated = false;
            this.data
              .putRessource(this.entityService.entity, tempId, res)
              .subscribe(
                (res) => {
                  this.toastr.success("Ressource invalidé!");
                  console.log("Ressource invalidée", res);
                  this.load();
                },
                (err) => {
                  console.log(err);
                }
              );
          } else if (
            (selected.isValidated = '"<i class="fa fa-times text-success"></i>"')
          ) {
            this.toastr.warning("Ressource déja valide!");
            console.log("Ressource déja valide");
            this.load();
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
};
}
