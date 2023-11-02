import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TvService } from 'src/app/data/services/tv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnDestroy {
  lstSearch!: any[];
  events = new Subscription();
  constructor(
    private readonly tvService: TvService,
    private readonly navCtrl: NavController
  ) {}
  ngOnDestroy(): void {
    this.events.unsubscribe();
  }

  search(event: any) {
    const query = (event.detail.value as string).trim();
    if (query) {
      this.events.add(
        this.tvService.search(query).subscribe((dataSearch) => {
          this.lstSearch = dataSearch;
        })
      );
    }
  }

  goToDetails(idShow: string) {
    this.navCtrl.navigateForward(`details/${idShow}`);
  }
}
