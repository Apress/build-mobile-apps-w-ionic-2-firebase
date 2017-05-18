import { ComponentFixture, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { TestUtils } from '../../test';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FavoritesPage } from './favorites';
import { User } from '../../model/User';
import { ItemsComponent } from '../../components/items/items';
import { ItemComponent } from '../../components/item/item';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { FavoriteServiceMock } from '../../testing/FavoriteServiceMock';
import { FavoriteService } from '../../services/FavoriteService';
import { AuthService } from '../../services/AuthService';
import { AuthServiceMock } from '../../testing/AuthServiceMock';
import { OpenPageService } from '../../services/OpenPageService';
import { SocialSharingService } from '../../services/SocialSharingService';
import { createCommonMocks } from '../../testing/CommonMock';

let fixture: ComponentFixture<FavoritesPage> = null;
let component: any = null;

describe('favorites page', () => {
  beforeEach(async(() => {
    const {
      loadingControllerStub,
      toastControllerStub,
      alertControllerStub,
      openPageServiceStub,
      socialSharingServiceStub,
    } = createCommonMocks();

    TestUtils.beforeEachCompiler(
      [FavoritesPage, ItemsComponent, ItemComponent, TimeAgoPipe],
      [
        {provide: FavoriteService, useClass: FavoriteServiceMock},
        {provide: LoadingController, useValue: loadingControllerStub},
        {provide: ToastController, useValue: toastControllerStub},
        {provide: AlertController, useValue: alertControllerStub},
        {provide: OpenPageService, useValue: openPageServiceStub},
        {provide: SocialSharingService, useValue: socialSharingServiceStub},
        {provide: AuthService, useClass: AuthServiceMock},
      ]
    ).then(compiled => {
      fixture = compiled.fixture;
      component = compiled.instance;
    });
  }));

  it('should display favorites items', async(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const favoriteService = fixture.debugElement.injector.get(FavoriteService);
    authService.logIn(new User('user', 'user', 'user@test.com', ''));
    favoriteService.add(1);
    favoriteService.add(2);
    favoriteService.add(3);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.css('ion-item'));
      expect(debugElements.length).toBe(3);
    });
  }));

  it('should handle removal of favorites items', async(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const favoriteService = fixture.debugElement.injector.get(FavoriteService);
    authService.logIn(new User('user', 'user', 'user@test.com', ''));
    favoriteService.add(1);
    favoriteService.add(2);
    favoriteService.add(3);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.css('ion-icon[name=heart]'));
      expect(debugElements.length).toBe(3);
      favoriteService.remove(1);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let debugElements = fixture.debugElement.queryAll(By.css('ion-icon[name=heart]'));
        expect(debugElements.length).toBe(2);
        component.doRefresh();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          let debugElements = fixture.debugElement.queryAll(By.css('ion-item'));
          expect(debugElements.length).toBe(2);
        });
      });
    });
  }));
});
