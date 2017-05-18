import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/pluck';
import { AbstractItemService } from './AbstractItemService';
import { HackerNewsService } from '../services/HackerNewsService'; 

@Injectable()
export class CommentService extends AbstractItemService {
  constructor(protected hackerNewsService: HackerNewsService) {
    super(hackerNewsService);
  }

  getItemIds(itemId: number): Observable<number[]> {
    return this.hackerNewsService.item(itemId)
      .pluck('kids') as Observable<number[]>;
  }
}
