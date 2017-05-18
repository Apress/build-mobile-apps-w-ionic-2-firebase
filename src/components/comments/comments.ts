import { Component, Input } from '@angular/core';
import { Items } from '../../model/Items';
import { ViewComment } from "../../model/Item";

@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})
export class CommentsComponent {
  @Input() items: Items;
  @Input() viewReply: ViewComment;
}
