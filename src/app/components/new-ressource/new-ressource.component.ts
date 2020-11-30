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
  selector: 'app-new-ressource',
  templateUrl: './new-ressource.component.html',
  styleUrls: ['./new-ressource.component.scss']
})
export class NewRessourceComponent implements OnInit {
  public ressourceData: Object;

  public ressourcesForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    typeofquantity: new FormControl(null, Validators.required),
    toFactorize: new FormControl(null, Validators.required),
  });

  constructor(
    public entityService: EntityService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private data: DataService
  ) {}

  ngOnInit() {
    this.ressourcesForm.patchValue({toFactorize: "1"});
    console.log("check",this.ressourcesForm.value)
  }

  createRessource() {
    this.ressourcesForm.value.isValidated="0";
    async.waterfall(
      [
        (c) => {
            this.data
            .postRessource(this.entityService.entity, this.ressourcesForm.value)
            .subscribe(
              res => {
                this.ressourceData = res;
                console.log(this.ressourceData);
              },
              err => {
                console.log(err);
              }
            );
          c(null);
        },
        (c) => {
          this.toastr.success('Nouvelle ressource proposée', 'Notification');
          this.router.navigateByUrl(':entity/cocktails')
          c(null)
      }
      ],
      () => {
      }
    );
  }
}
