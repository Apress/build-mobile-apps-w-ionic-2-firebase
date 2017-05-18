import { Component, Input } from '@angular/core';
import { Items } from '../../model/Items';
import { OpenPage, ViewComment, AddToFavorite, RemoveFromFavorite, Share } from "../../model/Item";

@Component({
  selector: 'items',
  templateUrl: 'items.html',
})
export class ItemsComponent {
  @Input() items: Items;
  @Input() openPage: OpenPage;
  @Input() viewComment: ViewComment;
  @Input() enableFavorite: boolean;
  @Input() addToFavorite: AddToFavorite;
  @Input() removeFromFavorite: RemoveFromFavorite;
  @Input() share: Share;
}
