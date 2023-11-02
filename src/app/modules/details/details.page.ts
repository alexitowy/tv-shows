import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TvService } from 'src/app/data/services/tv.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {
  show!: any;
  events = new Subscription();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly navCtrl: NavController,
    private readonly tvService: TvService
  ) {}
  ngOnDestroy(): void {
    this.events.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      const idShow = data.id;
      if (!idShow) {
        this.navCtrl.back();
      }
      this.events.add(
        this.tvService.getDetailsByIdShow(idShow).subscribe((show: any) => {
          show.authors = show.created_by
            .map((author: any) => author.name)
            .join(',');
          this.show = show;
        })
      );
    });
  }
}
