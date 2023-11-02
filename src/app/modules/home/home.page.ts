import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TvService } from '../../data/services/tv.service';
import { Genre } from '../../models/interfaces/genre';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  events: Subscription = new Subscription();
  shows!: any[];
  genres!: Genre[];
  constructor(
    private readonly navCtrl: NavController,
    private readonly tvService: TvService
  ) {
    this.events.add(
      this.tvService.getGenre().subscribe((genres: Genre[]) => {
        this.genres = genres;
        this.loadTvShowsByGenre();
      })
    );
  }
  ngOnDestroy(): void {
    this.events.unsubscribe();
  }

  search() {
    this.navCtrl.navigateForward('search');
  }

  loadTvShowsByGenre() {
    for (const genre of this.genres) {
      this.events.add(
        this.tvService.getShowsByGenre(genre.id).subscribe((shows: any[]) => {
          genre.shows = shows;
        })
      );
    }
  }

  goToDetails(idShow: string) {
    this.navCtrl.navigateForward(`details/${idShow}`);
  }
}
