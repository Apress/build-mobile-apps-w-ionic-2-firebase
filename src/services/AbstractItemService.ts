import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import { Items } from '../model/Items';
import { HackerNewsService } from '../services/HackerNewsService';

export interface Query {
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable()
export abstract class AbstractItemService {
  queries: Subject<Query> = new Subject<Query>();

  constructor(protected hackerNewsService: HackerNewsService) {}

  load(query: Query): void {
    this.queries.next(query);
  }

  get(itemId: number = null): Observable<Items> {
    const rawItemIds = this.getItemIds(itemId);
    const itemIds = Observable.combineLatest(
      rawItemIds,
      this.queries,
      (ids: number[], query: Query) => ({ids, query}),
    ).filter(v => v.query.refresh)
      .pluck('ids');
    const selector = ({refresh, offset, limit}, ids) => ({
      refresh,
      offset,
      limit,
      total: ids.length,
      results: ids.slice(offset, offset + limit)
        .map(id => this.hackerNewsService.item(id)),
    });

    const items = Observable.merge(
      this.queries.combineLatest(itemIds, selector).take(1),
      this.queries.skip(1).withLatestFrom(itemIds, selector)
    );
    const loadings = Observable.of({
      loading: true,
      offset: 0,
      limit: 0,
      results: [],
    });
    return Observable.merge(loadings, items);
  }

  abstract getItemIds(itemId: number): Observable<number[]>;
}
