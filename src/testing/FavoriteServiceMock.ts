import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from '../services/AuthService';
import { HackerNewsServiceMock } from './HackerNewsServiceMock';
import { AbstractItemService } from '../services/AbstractItemService';
import * as pull from 'lodash.pull';

type Store = { [key:number]: BehaviorSubject<any>; };

@Injectable()
export class FavoriteServiceMock extends AbstractItemService {
  store: Store = {};
  itemIds: number[] = [];
  items: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  constructor(private authService: AuthService) {
    super(new HackerNewsServiceMock() as any);
  }

  add(itemId: number) {
    const user = this.authService.user.getValue();
    if (user == null) {
      return;
    }
    const value = {
      $value: new Date().getTime(),
    };
    if (this.store[itemId]) {
      this.store[itemId].next(value);
    } else {
      this.store[itemId] = new BehaviorSubject(value);
    }
    this.itemIds.unshift(itemId);
    this.items.next(this.itemIds);
  }

  remove(itemId: number) {
    const user = this.authService.user.getValue();
    if (user == null) {
      return;
    }
    const value = {
      $value: null,
    };
    if (this.store[itemId]) {
      this.store[itemId].next(value);
    }
    pull(this.itemIds, itemId);
    this.items.next(this.itemIds);
  }

  getItemIds(): Observable<number[]> {
    return this.items;
  }

  getFavoriteItem(itemId: number): Observable<any> {
    return this.authService.user.mergeMap(user => {
      if (user) {
        if (!this.store[itemId]) {
          this.store[itemId] = new BehaviorSubject({
            $value: null,
          });
        }
        return this.store[itemId];
      } else {
        return Observable.of({
          $value: null,
        });
      }
    });
  }
}
