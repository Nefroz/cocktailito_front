import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

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


const routes: Routes = [
  {path: ':entity/ressources', component: RessourcesComponent },
  {path: ':entity/cocktails', component: CocktailsComponent },
  {path: ':entity/articles', component: ArticlesComponent },
  {path: ':entity/users', component: UsersComponent },
  {path: ':entity/newuser', component: NewUserComponent },
  {path: ':entity/newcocktail', component: NewCocktailComponent },
  {path: ':entity/newressource', component: NewRessourceComponent },
  {path: ':entity/newarticle', component: NewArticleComponent },
  {path: ':entity/magicbar', component: MagicBarComponent },
  {path: ':entity/contact', component: ContactComponent },
  {path: '', redirectTo: 'cocktails', pathMatch: 'full' },
  {path: '**', redirectTo: 'cocktails' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
