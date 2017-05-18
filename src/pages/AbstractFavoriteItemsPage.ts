import { Observable } from "rxjs";
import { AbstractItemsPage } from './AbstractItemsPage';
import { Items } from '../model/Items';
import { AuthService } from '../services/AuthService';
import { FavoriteService } from '../services/FavoriteService';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { CommentsPage } from './comments/comments';
import { OpenPage, Share } from "../model/Item";
import { OpenPageService } from "../services/OpenPageService";
import { SocialSharingService } from '../services/SocialSharingService';

export abstract class AbstractFavoriteItemsPage extends AbstractItemsPage {
  openPage: OpenPage;
  share: Share;
  enableFavorite: Observable<boolean>;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              protected openPageService: OpenPageService,
              protected authService: AuthService,
              protected favoriteService: FavoriteService,
              protected socialSharingService: SocialSharingService) {
    super(navCtrl, loadingCtrl, toastCtrl);
    this.openPage = openPageService.open.bind(openPageService);
    this.viewComment = this.viewComment.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.removeFromFavorite = this.removeFromFavorite.bind(this);
    this.enableFavorite = authService.user.map(user => user != null);
    this.share = socialSharingService.share.bind(socialSharingService);
  }

  protected viewComment(itemId: number): void {
    this.navCtrl.push(CommentsPage, {
      itemId,
    });
  }

  protected addToFavorite(itemId: number) {
    return this.favoriteService.add(itemId);
  }

  protected removeFromFavorite(itemId: number) {
    return this.favoriteService.remove(itemId);
  }

  private mergeFavorites(): Observable<Items> {
    return this.getRawItems().map(items => {
      items.results = items.results.map(result =>
        result.mergeMap(item => this.favoriteService.getFavoriteItem(item.id).map(v => {
          item.isFavorite = !!v.$value;
          return item;
        }))
      );
      return items;
    });
  }

  protected getItems(): Observable<Items> {
    return this.mergeFavorites();
  }

  protected abstract getRawItems(): Observable<Items>;
}
