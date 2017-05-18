import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from "rxjs";
import { AuthService } from '../../services/AuthService';
import { FavoriteService } from '../../services/FavoriteService';
import { Items } from '../../model/Items';
import { Query } from '../../services/AbstractItemService';
import { AbstractFavoriteItemsPage } from '../AbstractFavoriteItemsPage';
import { OpenPageService } from "../../services/OpenPageService";
import { SocialSharingService } from '../../services/SocialSharingService';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage extends AbstractFavoriteItemsPage {
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              protected openPageService: OpenPageService,
              protected authService: AuthService,
              protected favoriteService: FavoriteService,
              protected socialSharingService: SocialSharingService) {
    super(
      navCtrl, loadingCtrl, toastCtrl,
      openPageService, authService, favoriteService, socialSharingService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getRawItems(): Observable<Items> {
    return this.favoriteService.get();
  }

  query(query: Query): void {
    this.favoriteService.load(query);
  }
}
