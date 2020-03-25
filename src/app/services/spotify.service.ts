import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log("Spotify service listo");
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQB2M-sGHuxrK2oLsEz6mRmDoe9_Qqo8sj7l7PuD9YxHKWe1hdPXF72f2m7tfNkz4d68DHf56SJx_-5v5oc'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    /*const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQDBuoR71C_eS24TBIFxCRf3BVLevnXM7diyGiKNYH_XlRBHiarRlRx_5HT7vMK6baQ1p9LqytP8qDlo3Zo'
    });*/

    return this.getQuery('browse/new-releases?limit=21')
                .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string) {
    /*const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQDBuoR71C_eS24TBIFxCRf3BVLevnXM7diyGiKNYH_XlRBHiarRlRx_5HT7vMK6baQ1p9LqytP8qDlo3Zo'
    });*/

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe(map( data => data['artists'].items));
  }

  getArtista(id: string) {

    return this.getQuery(`artists/${ id }`);
                //.pipe(map( data => data['artists'].items));
  }

  getTopTracks( id: string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));
  }
}
