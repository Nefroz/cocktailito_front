import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { EntityService } from './services/entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cocktailito';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private entity:EntityService,
  ) {
    this.entity.set("root")
  }

  public navLinks: Array<any> = [
    { title: 'Ressources', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/ressources'); } },
    { title: 'Cocktails', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/cocktails'); } },
    { title: 'Articles', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/articles'); } },
    { title: 'Users', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/users'); } },
    { title: 'New User', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/newuser'); } },
    { title: 'Suggérer un cocktail', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/newcocktail'); } },
    { title: 'Suggérer une ressource', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/newressource'); } },
    { title: 'New Article', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/newarticle'); } },
    { title: 'Magic Bar', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/magicbar'); } },
    { title: 'Contact', icon: 'fas fa-book', click: () => { this.router.navigateByUrl('/'+this.entity+'/contact'); } },
  ];
}
