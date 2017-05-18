import { ComponentFixture, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { TestUtils } from '../../test';
import { TopStoriesPage } from './top-stories';
import { ItemsComponent } from '../../components/items/items';
import { ItemComponent } from '../../components/item/item';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { ItemService } from '../../services/ItemService';
import { OpenPageService } from '../../services/OpenPageService';
import { ItemServiceMock, generateItems } from '../../testing/ItemServiceMock';
import { Observable } from "rxjs";
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { SocialSharingService } from '../../services/SocialSharingService';
import { FavoriteService } from '../../services/FavoriteService';
import { AuthService } from '../../services/AuthService';
import { AuthServiceMock } from '../../testing/AuthServiceMock';
import { FavoriteServiceMock } from '../../testing/FavoriteServiceMock';
import { createCommonMocks } from '../../testing/CommonMock';

let fixture: ComponentFixture<TopStoriesPage> = null;
let component: any = null;

describe('top stories page', () => {

  beforeEach(async(() => {
    const {
      loadingControllerStub,
      toastControllerStub,
      alertControllerStub,
      openPageServiceStub,
      socialSharingServiceStub,
    } = createCommonMocks();

    TestUtils.beforeEachCompiler(
      [TopStoriesPage, ItemsComponent, ItemComponent, TimeAgoPipe],
      [
        {provide: ItemService, useClass: ItemServiceMock},
        {provide: LoadingController, useValue: loadingControllerStub},
        {provide: ToastController, useValue: toastControllerStub},
        {provide: AlertController, useValue: alertControllerStub},
        {provide: OpenPageService, useValue: openPageServiceStub},
        {provide: SocialSharingService, useValue: socialSharingServiceStub},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: FavoriteService, useClass: FavoriteServiceMock},
      ]
    ).then(compiled => {
      fixture = compiled.fixture;
      component = compiled.instance;
    });
  }));

  it('should display a list of 10 items', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.css('h2'));
      expect(debugElements.length).toBe(10);
      expect(debugElements[0].nativeElement.textContent).toContain('Item 1');
      expect(debugElements[1].nativeElement.textContent).toContain('Item 2');
    });
  }));

  it('should show more items when scrolling down', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.next();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let debugElements = fixture.debugElement.queryAll(By.css('h2'));
        expect(debugElements.length).toBe(20);
        expect(debugElements[10].nativeElement.textContent).toContain('Item 11');
      });
    });
  }));

  it('should show first 10 items when refresh', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.next();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let debugElements = fixture.debugElement.queryAll(By.css('h2'));
        expect(debugElements.length).toBe(20);
        expect(debugElements[10].nativeElement.textContent).toContain('Item 11');
        component.doRefresh();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          let debugElements = fixture.debugElement.queryAll(By.css('h2'));
          expect(debugElements.length).toBe(10);
          expect(debugElements[0].nativeElement.textContent).toContain('Item 1');
        });
      });
    });
  }));

  it('should display loading indicators', async(() => {
    const loadingController = fixture.debugElement.injector.get(LoadingController);
    fixture.detectChanges();
    expect(loadingController.create).toHaveBeenCalledTimes(1);
    expect(loadingController.create().present).toHaveBeenCalledTimes(1);
    expect(loadingController.create().dismiss).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.css('h2'));
      expect(debugElements.length).toBe(10);
    });
  }));

  it('should handle errors', async(() => {
    const itemService = fixture.debugElement.injector.get(ItemService);
    spyOn(itemService, 'get')
      .and.returnValues(
        Observable.throw(new Error('boom!')),
        Observable.of({
          refresh: true,
          offset: 0,
          limit: 10,
          results: generateItems(0, 10),
        })
      );
    const toastController = fixture.debugElement.injector.get(ToastController);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(toastController.create).toHaveBeenCalled();
      expect(toastController.create().present).toHaveBeenCalled();
      let debugElements = fixture.debugElement.queryAll(By.css('h2'));
      expect(debugElements.length).toBe(10);
    });
  }));

  it('should open web pages', async(() => {
    const openPageService = fixture.debugElement.injector.get(OpenPageService);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.css('ion-item'));
      expect(debugElements.length).toBe(10);
      debugElements[0].triggerEventHandler('click', null);
      expect(openPageService.open).toHaveBeenCalledWith('http://www.example.com/item0');
    });
  }));
});
