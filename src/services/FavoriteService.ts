import { Injectable } from "@angular/core";
import { AngularFire } from 'angularfire2';
import { AuthService } from './AuthService';
import { AbstractItemService } from './AbstractItemService';
import { HackerNewsService } from '../services/HackerNewsService';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as sortBy from 'lodash.sortby';
import * as map from 'lodash.map';
import * as pluck from 'lodash.pluck';
import * as filter from 'lodash.filter';

@Injectable()
export class FavoriteService extends AbstractItemService {
  constructor(private af: AngularFire,
              private authService: AuthService,
              protected hackerNewsService: HackerNewsService) {
    super(hackerNewsService);
  }

  add(itemId: number) {
    const user = this.authService.user.getValue();
    if (user == null) {
      return Promise.resolve(null);
    }
    return this.af.database.object(this.getItemPath(user.uid, itemId)).set(new Date().getTime());
  }

  remove(itemId: number) {
    const user = this.authService.user.getValue();
    if (user == null) {
      return Promise.resolve(null);
    }
    return this.af.database.object(this.getItemPath(user.uid, itemId)).remove();
  }

  getItemIds(): Observable<number[]> {
    return this.authService.user.mergeMap(user => {
      if (user == null) {
        return Observable.of([]);
      }
      return this.af.database.object(this.getBasePath(user.uid))
        .map(obj => pluck(sortBy(filter(map(obj, (v, k) => ({
          id: parseInt(k, 10),
          timestamp: v,
        })), v => !isNaN(v.id)), 'timestamp').reverse(), 'id'));
    });
  }

  getFavoriteItem(itemId: number): Observable<any> {
    return this.authService.user.mergeMap(user => {
      if (user) {
        return this.af.database.object(this.getItemPath(user.uid, itemId));
      } else {
        return Observable.of({
          $value: null,
        });
      }
    });
  }

  private getBasePath(uid: string): string {
    return `/favorites/${uid}`;
  }

  private getItemPath(uid: string, itemId: number): string {
    return `${this.getBasePath(uid)}/${itemId}`;
  }
}
