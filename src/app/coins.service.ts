import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';

export type Coin = Record<string, string | number | boolean>;

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  constructor(private httpClient: HttpClient) {}

  readonly coins$: Observable<Coin[]> = this.httpClient
    .get<Coin[]>(`https://api.coinpaprika.com/v1/coins`)
    .pipe(
      filter((allCoins: Coin[]) => allCoins.length > 10),
      map((allCoins: Coin[]) =>
        allCoins.filter(
          (coin: Coin) =>
            !coin.is_new && coin.rank > 0 && coin.rank < 100
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
}
