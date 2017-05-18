import { Component } from '@angular/core';
import {
  NavController,
  ViewController,
  LoadingController,
  ToastController,
} from 'ionic-angular';
import { User } from '../../model/User';
import { AuthService } from '../../services/AuthService';
import { AbstractBasePage } from '../AbstractBasePage';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage extends AbstractBasePage {
  user: User = User.createBlank();
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private authService: AuthService) {
    super(navCtrl, loadingCtrl, toastCtrl);
  }

  dismiss(signedUp: boolean = false): void {
    this.viewCtrl.dismiss(signedUp);
  }

  signUp(): void {
    this.showLoading();
    this.authService.create(this.user)
      .then(_ => {
        this.hideLoading();
        this.dismiss(true);
      })
      .catch(error => {
        this.hideLoading();
        this.showError(error);
      });
  }

  protected getLoadingMessage(): string {
    return 'Creating your account...';
  }

  protected getErrorMessage(error: any): string {
    return `Failed to create your account. The error message is ${error.message}.`;
  }
}
