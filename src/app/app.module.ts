import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { SuperComposModule } from 'super-compos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as async from "async"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { EntityService } from 'src/app/services/entity.service';

import { PrimengModule } from "src/app/_modules/@primeng.module";
import { AngularModule } from "src/app/_modules/@angular.module";

import { RessourcesComponent } from './components/ressources/ressources.component';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { ArticlesComponent } from './components/articles/articles.component'
import { UsersComponent } from './components/users/users.component'
import { NewUserComponent } from './components/new-user/new-user.component'
import { NewCocktailComponent } from './components/new-cocktail/new-cocktail.component'
import { NewRessourceComponent } from './components/new-ressource/new-ressource.component'
import { NewArticleComponent } from './components/new-article/new-article.component'
import { MagicBarComponent } from './components/magic-bar/magic-bar.component'
import { ContactComponent } from './components/contact/contact.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RessourcesComponent,
    CocktailsComponent,
    ArticlesComponent,
    UsersComponent,
    NewUserComponent,
    NewCocktailComponent,
    NewRessourceComponent,
    NewArticleComponent,
    MagicBarComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    SuperComposModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    CommonModule,
    PrimengModule,
    AngularModule,
  ],
  providers: [
    EntityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
