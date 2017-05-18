import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommentService } from '../../services/CommentService';
import { AbstractItemsPage } from '../AbstractItemsPage';
import { LoadingController, ToastController } from 'ionic-angular';
import { Items } from '../../model/Items';
import { Observable } from "rxjs";
import { Query } from '../../services/AbstractItemService';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html'
})
export class CommentsPage extends AbstractItemsPage {

  constructor(public navCtrl: NavController, 
              private params: NavParams,
              private commentService: CommentService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    super(navCtrl, loadingCtrl, toastCtrl);
    this.viewReply = this.viewReply.bind(this);          
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  viewReply(itemId: number): void {
    this.navCtrl.push(CommentsPage, {
      itemId,
    });
  }

  getItems(): Observable<Items> {
    return this.commentService.get(this.params.get('itemId'));
  }

  query(query: Query): void {
    this.commentService.load(query);
  }
}
