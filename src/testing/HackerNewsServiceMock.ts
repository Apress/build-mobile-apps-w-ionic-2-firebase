import { Observable } from 'rxjs';
import { generateItem } from './ItemServiceMock';

export class HackerNewsServiceMock {
  item(id: number) {
    return Observable.of(generateItem(id));
  }
}