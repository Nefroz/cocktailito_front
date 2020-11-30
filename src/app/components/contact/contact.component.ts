import { Component, OnInit } from "@angular/core";
import { EntityService } from "src/app/services/entity.service";
import * as _ from "underscore";
import * as async from "async";
import { Ressource } from "src/app/_class/ressource/ressource";
import { Users } from "src/app/_class/users/users";
import { Cocktails } from "src/app/_class/cocktails/cocktails";
import { Contacts } from "src/app/_class/contacts/contacts";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
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
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactsData: Object;

  public contactsForm = new FormGroup({
    subject: new FormControl(null),
    text: new FormControl(null, Validators.required),
    emailcontact: new FormControl(null),
    telcontact: new FormControl(null),
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
  }

  createContact() {
    async.waterfall(
      [
        (c) => {
            this.data
            .postContact(this.entityService.entity, this.contactsForm.value)
            .subscribe(
              res => {
                this.contactsData = res;
                console.log(this.contactsData);
              },
              err => {
                console.log(err);
              }
            );
          c(null);
        },
        (c) => {
          this.toastr.success('Message envoyé', 'Notification');
          this.router.navigateByUrl(':entity/cocktails')
          c(null)
      },
      ],
      () => {
      }
    );
  }

}
