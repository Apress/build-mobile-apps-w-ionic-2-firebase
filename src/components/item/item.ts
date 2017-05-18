import { Component, Input } from '@angular/core';
import { Item, OpenPage, ViewComment, AddToFavorite, RemoveFromFavorite, Share } from '../../model/Item';

@Component({
  selector: 'item',
  templateUrl: 'item.html',
})
export class ItemComponent {
  @Input() item: Item;
  @Input() openPage: OpenPage;
  @Input() viewComment: ViewComment;
  @Input() enableFavorite: boolean;
  addToFavoriteDisabled: boolean = false;
  @Input() addToFavorite: AddToFavorite;
  removeFromFavoriteDisabled: boolean = false;
  @Input() removeFromFavorite: RemoveFromFavorite;
  @Input() share: Share;

  add() {
    this.addToFavoriteDisabled = true;
    this.addToFavorite(this.item.id)
      .then(_ => this.addToFavoriteDisabled = false)
      .catch(_ => this.addToFavoriteDisabled = false);
  }

  remove() {
    this.removeFromFavoriteDisabled = true;
    this.removeFromFavorite(this.item.id)
      .then(_ => this.removeFromFavoriteDisabled = false)
      .catch(_ => this.removeFromFavoriteDisabled = false);
  }
}
