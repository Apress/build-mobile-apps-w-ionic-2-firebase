import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Items } from '../../model/Items';
import { ItemService } from '../../services/ItemService';
import { Observable } from "rxjs";
import 'rxjs/add/operator/combineLatest';
import { OpenPageService } from "../../services/OpenPageService";
import { Query } from '../../services/AbstractItemService';
import { FavoriteService } from '../../services/FavoriteService';
import { AuthService } from '../../services/AuthService';
import { AbstractFavoriteItemsPage } from '../AbstractFavoriteItemsPage';
import { SocialSharingService } from '../../services/SocialSharingService';

@Component({
  selector: 'page-top-stories',
  templateUrl: 'top-stories.html'
})
export class TopStoriesPage extends AbstractFavoriteItemsPage {
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              protected itemService: ItemService,
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
    return this.itemService.get();
  }

  query(query: Query): void {
    this.itemService.load(query);
  }
}
