import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import * as range from 'lodash.range';
import { Items } from '../model/Items';
import { Item } from '../model/Item';
import { ItemService } from '../services/ItemService';
import { Query } from '../services/AbstractItemService';

@Injectable()
export class ItemServiceMock extends ItemService {
  queries: Subject<Query> = new Subject<Query>();
  load(query: Query) {
    this.queries.next(query);
  }

  get(): Observable<Items> {
    return this.queries.map(query => ({
      refresh: query.refresh,
      offset: query.offset,
      limit: query.limit,
      total: query.offset + query.limit + 1,
      results: generateItems(query.offset, query.limit),
    } as Items)).startWith({
      loading: true,
      offset: 0,
      limit: 0,
      results: [],
    });
  }
}

export function generateItems(offset: number = 0, limit: number = 10): Observable<Item>[] {
  return range(offset, offset + limit).map(index => Observable.of(generateItem(index)));
}

export function generateItem(id: number) {
  return {
    id,
    title: `Item ${id + 1}`,
    url: `http://www.example.com/item${id}`,
    by: `demo`,
    time: new Date().getTime() / 1000,
    score: id,
  };
}
