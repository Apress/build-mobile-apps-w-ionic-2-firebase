import {
  NavController,
  LoadingController,
  Loading,
  ToastController,
} from "ionic-angular";

export class AbstractBasePage {
  loading: Loading;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {}

  protected showLoading() {
    this.hideLoading();
    this.loading = this.loadingCtrl.create({
      content: this.getLoadingMessage(),
    });
    this.loading.present();
  }

  protected getLoadingMessage(): string {
    return 'Loading...';
  }

  protected hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  protected showError(error: any) {
    this.toastCtrl.create({
      message: this.getErrorMessage(error),
      showCloseButton: true,
    }).present();
  }

  protected getErrorMessage(error: any): string {
    return '';
  }
}
