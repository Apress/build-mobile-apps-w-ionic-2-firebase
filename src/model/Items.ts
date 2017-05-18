import { Observable } from 'rxjs';
import { Item } from './Item';

export interface Items {
  refresh?: boolean;
  offset: number;
  limit: number;
  total?: number;
  results: Observable<Item>[];
  loading?: boolean;
}
