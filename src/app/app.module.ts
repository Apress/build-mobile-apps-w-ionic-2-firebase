import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { TimeAgoPipe } from '../pipes/TimeAgoPipe';
import { TopStoriesPage } from '../pages/top-stories/top-stories';
import { ItemsComponent } from '../components/items/items';
import { ItemComponent } from '../components/item/item';
import { CommentsPage } from '../pages/comments/comments';
import { CommentsComponent } from '../components/comments/comments';
import { CommentComponent } from '../components/comment/comment';
import { ItemService } from '../services/ItemService';
import { OpenPageService } from '../services/OpenPageService';
import { CommentService } from '../services/CommentService';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HackerNewsService } from '../services/HackerNewsService';
import { AuthService } from '../services/AuthService';
import { FavoriteService } from '../services/FavoriteService';
import { FavoritesPage } from '../pages/favorites/favorites';
import { SocialSharingService } from '../services/SocialSharingService';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { DeployService } from '../services/DeployService';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Oauth } from 'ng2-cordova-oauth/oauth';

export const firebaseConfig = {
  apiKey: 'AIzaSyA6yagMqIiiRvPRLct-cH1RhnVtBCEL650',
  authDomain: 'hacker-news-ionic2.firebaseapp.com',
  databaseURL: 'https://hacker-news-ionic2.firebaseio.com',
  storageBucket: 'hacker-news-ionic2.appspot.com',
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '647e4554',
  },
};

@NgModule({
  declarations: [
    MyApp,
    TopStoriesPage,
    ItemsComponent,
    ItemComponent,
    TimeAgoPipe,
    CommentsPage,
    CommentsComponent,
    CommentComponent,
    LoginPage,
    SignupPage,
    FavoritesPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TopStoriesPage,
    ItemsComponent,
    ItemComponent,
    CommentsPage,
    CommentsComponent,
    CommentComponent,
    LoginPage,
    SignupPage,
    FavoritesPage,
  ],
  providers: [
    ItemService,
    OpenPageService,
    CommentService,
    HackerNewsService,
    AuthService,
    FavoriteService,
    SocialSharingService,
    DeployService,
    { provide: Oauth, useClass: OauthCordova }
  ]
})
export class AppModule {}
