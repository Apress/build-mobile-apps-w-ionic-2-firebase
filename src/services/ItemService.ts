import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AbstractItemService } from './AbstractItemService'; 
import { HackerNewsService } from '../services/HackerNewsService'; 

@Injectable()
export class ItemService extends AbstractItemService {
  constructor(protected hackerNewsService: HackerNewsService) {
    super(hackerNewsService);
  }

  getItemIds(): Observable<number[]> {
    return this.hackerNewsService.topStories()
      .map(ids => ids.map(v => v.$value));
  }
}
