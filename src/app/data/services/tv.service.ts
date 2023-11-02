import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { Genre } from 'src/app/models/interfaces/genre';
import { Shows } from 'src/app/models/interfaces/shows';

@Injectable({
  providedIn: 'root',
})
export class TvService extends BaseService {
  constructor(public override readonly http: HttpClient) {
    super(http);
  }

  getShowsByGenre(idGenere: string): Observable<any[]> {
    return this.get<any[]>(
      `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=${idGenere}`
    ).pipe(map((data: any) => data.results));
  }

  getGenre() {
    return this.get<Genre[]>(`/genre/tv/list?language=es`).pipe(
      map((data: any) => data.genres)
    );
  }

  getDetailsByIdShow(idShow: string) {
    return this.get<any[]>(`/tv/${idShow}?language=es-ES`);
  }

  search(query: string) {
    return this.get<any[]>(
      `/search/tv?query=${query}&include_adult=false&language=es-ES&page=1`
    ).pipe(map((data: any) => data.results));
  }
}
