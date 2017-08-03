import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { RouterModule, Router } from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';



@Component({
  selector: 'my-heroes',
 templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ],
  providers: [HeroService]
})

export class HeroesComponent   {
  
  heroes: Hero[];
  selectedHero: Hero;
  
constructor(
  private router: Router,
  private heroService: HeroService) { }
 getHeroes(): void {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  
  gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
}

delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}
  

}


