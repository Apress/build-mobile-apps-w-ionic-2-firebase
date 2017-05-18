import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from '../services/AuthService';
import { TopStoriesPage } from '../pages/top-stories/top-stories';
import { LoginPage } from '../pages/login/login';
import { FavoritesPage } from '../pages/favorites/favorites';
import { DeployService } from '../services/DeployService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TopStoriesPage;

  constructor(public platform: Platform,
              public modalCtrl: ModalController,
              public authService: AuthService,
              public deployService: DeployService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.deployService.checkForUpdates();
    });
  }

  showTopStories() {
    this.nav.setRoot(TopStoriesPage);
  }

  showFavorites() {
    this.nav.setRoot(FavoritesPage);
  }

  showLogIn() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  logOut() {
    this.authService.logOut();
    this.showTopStories();
  }
}
