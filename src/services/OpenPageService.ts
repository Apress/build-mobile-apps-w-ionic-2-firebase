import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';
import { AlertController, Alert } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Subscription } from "rxjs";

@Injectable()
export class OpenPageService {
  browser: InAppBrowser;
  loading: Alert;
  subscription: Subscription;
  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController) {

  }
  open(url: string): void {
    this.cancel();
    this.browser = new InAppBrowser(url, '_blank', 'location=no,hidden=yes');
    this.subscription = this.browser.on('loadstart').subscribe(event => this.showLoading());
    this.subscription.add(this.browser.on('loadstop').subscribe(event => {
        this.hideLoading();
        this.browser.show();
    }));
    this.subscription.add(this.browser.on('loaderror').subscribe(event => this.handleError(event)));
    this.subscription.add(this.browser.on('exit').subscribe(event => this.cleanup()));
  }

  showLoading(): void {
    this.hideLoading();
    this.loading = this.alertCtrl.create({
      title: 'Opening...',
      message: 'The page is loading. You can press the Cancel button to stop it.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: this.cancel.bind(this),
        }
      ],
    });
    this.loading.present();
  }

  cancel(): void {
    this.hideLoading();
    this.cleanup();
  }

  handleError(event: InAppBrowserEvent): void {
    this.showError(event);
    this.cleanup();
  }

  hideLoading(): void {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  showError(event: InAppBrowserEvent): void {
    this.hideLoading();
    const toast = this.toastCtrl.create({
      message: `Failed to load the page. Code: ${event.code}, Message: ${event.message}`,
      duration: 3000,
      showCloseButton: true,
    });
    toast.present();
  }

  cleanup() : void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.browser) {
      this.browser.close();
      this.browser = null;
    }
  }
}
