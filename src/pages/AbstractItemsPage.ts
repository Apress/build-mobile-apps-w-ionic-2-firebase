import { OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as concat from 'lodash.concat';
import { Items } from '../model/Items';
import { Query } from '../services/AbstractItemService';
import { Observable, Subscription } from "rxjs";
import { AbstractBasePage } from './AbstractBasePage';

export abstract class AbstractItemsPage extends AbstractBasePage implements OnInit, OnDestroy {
  items: Items;
  offset: number = 0;
  limit: number = 10;
  subscription: Subscription;
  infiniteScrollComponent: any;
  refresherComponent: any;
  loading: Loading;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    super(navCtrl, loadingCtrl, toastCtrl);              
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  init(): void {
    this.unsubscribe();
    this.subscription = this.getItems().subscribe(items => {
      if (items.loading) {
        this.showLoading();
        return;
      }
      this.hideLoading();
      if (items.refresh) {
        this.items = items;
        this.notifyRefreshComplete();
      } else {
        this.items.results = concat(this.items.results, items.results);
        this.notifyScrollComplete();
      }
    }, error => {
      this.showError(error);
      this.init();
    });
    this.doLoad(true);
  }

  unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasNext(): boolean {
    return this.items != null && this.offset < this.items.total;
  }

  next(): void {
    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean {
    return this.items != null;
  }

  refresh(refresher): void {
    this.refresherComponent = refresher;
    if (this.canRefresh()) {
      this.doRefresh();
    }
  }

  load(infiniteScroll) {
    this.infiniteScrollComponent = infiniteScroll;
    if (this.hasNext()) {
      this.next();
    }
  }

  doRefresh() : void {
    this.offset = 0;
    this.doLoad(true);
  }

  doLoad(refresh: boolean): void {
    this.query({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

  protected getErrorMessage(error: any): string {
    return 'Failed to load items, retry now...';
  } 

  protected abstract getItems(): Observable<Items>;
  protected abstract query(query: Query): void;
}
