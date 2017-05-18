import { ComponentFixture, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { TestUtils } from '../../test';
import { Item } from '../../model/Item';
import { Items } from '../../model/Items';
import { ItemsComponent } from './items';
import { ItemComponent } from '../item/item';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';

let fixture: ComponentFixture<ItemsComponent> = null;
let component: any = null;

describe('items component', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ItemsComponent, ItemComponent, TimeAgoPipe]).then(compiled => {
    fixture = compiled.fixture;
    component = compiled.instance;
  })));

  it('should display a list of items', () => {
    const results: Observable<Item>[] = [Observable.of({
      id: 1,
      title: 'Test item 1',
      url: 'http://www.example.com/test1',
      by: 'user1',
      time: 1478576387,
      score: 242,
    }), Observable.of({
      id: 2,
      title: 'Test item 2',
      url: 'http://www.example.com/test2',
      by: 'user2',
      time: 1478576387,
      score: 100,
    })];
    const items: Items = {
      offset: 0,
      limit: results.length,
      total: results.length,
      results,
    };
    component.items = items;
    fixture.detectChanges();
    let debugElements = fixture.debugElement.queryAll(By.css('h2'));
    expect(debugElements.length).toBe(2);
    expect(debugElements[0].nativeElement.textContent).toContain('Test item 1');
    expect(debugElements[1].nativeElement.textContent).toContain('Test item 2');
  });

  it('should display no items', () => {
    component.items = {
      offset: 0,
      limit: 0,
      total: 0,
      results: [],
    };
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('p'));
    expect(debugElement).not.toBeNull();
    expect(debugElement.nativeElement.textContent).toContain('No items');
  });
});
