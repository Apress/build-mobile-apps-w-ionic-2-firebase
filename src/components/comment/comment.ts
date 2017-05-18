import { Component, Input } from '@angular/core';
import { Item, ViewComment } from '../../model/Item';

@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent {
  @Input() item: Item;
  @Input() viewReply: ViewComment;
}
