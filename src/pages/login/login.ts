import { Component } from '@angular/core';
import {
  NavController,
  ModalController,
  LoadingController,
  ToastController,
  ViewController,
} from 'ionic-angular';
import * as firebase from 'firebase';
import { AuthProviders } from 'angularfire2';
import { SignupPage } from '../../pages/signup/signup';
import { User } from "../../model/User";
import { AuthService } from "../../services/AuthService";
import { AbstractBasePage } from '../AbstractBasePage';
import { GooglePlus, Facebook } from 'ionic-native';
import { Oauth } from 'ng2-cordova-oauth/oauth';
import { OAuthProvider } from 'ng2-cordova-oauth/provider';
import get from 'lodash.get';

declare var window:any;

const GitHubInfo = {
  clientId: 'a2de866c7a4055ee5f07',
  clientSecret: 'd8c3fa89f0e42732e1edf5d6b8308ab0eabbe992',
  state: 'randomstring',
};

class GitHub extends OAuthProvider {
    protected authUrl: string = 'https://github.com/login/oauth/authorize';
    protected defaults: Object = {
      responseType: 'code'
    };
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends AbstractBasePage {
  user: User = User.createBlank();
  githubProvider: GitHub = new GitHub({
    clientId: GitHubInfo.clientId,
    appScope: ['user:email'],
    state: GitHubInfo.state,
  });
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              private authService: AuthService,
              private oauth: Oauth) {
    super(navCtrl, loadingCtrl, toastCtrl);
  }

  logIn(): void {
    this.showLoading();
    this.authService.logIn(this.user).then(_ => {
      this.hideLoading();
      this.dismiss();
    }).catch(error => {
      this.hideLoading();
      this.showError(error);
    });
  }

  signUp(): void {
    const modal = this.modalCtrl.create(SignupPage);
    modal.onDidDismiss(signedUp => {
      if (signedUp) {
        this.dismiss();
      }
    });
    modal.present();
  }

  logInWithGoogle() {
    this.showLoading();
    GooglePlus.login({
      scopes: 'profile email',
      webClientId: '71182039094-8hkjiai2nl1g1s6vnqc1ko8n7ece0ht3.apps.googleusercontent.com',
      offline: false,
    }).then(response => {
      const credential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
      this.authService.logInWithCredential(credential, AuthProviders.Google)
        .then(_ => {
          this.hideLoading();
          this.dismiss();
        })
        .catch(error => {
          this.hideLoading();
          this.showError(error);
        })
    }).catch(message => {
      this.hideLoading();
      this.showError({ message });
    });
  }

  logInWithFacebook() {
    this.showLoading();
    Facebook.login(['public_profile']).then(response => {
      const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      this.authService.logInWithCredential(credential, AuthProviders.Facebook)
        .then(_ => {
          this.hideLoading();
          this.dismiss();
        }).catch(error => {
          this.hideLoading();
          this.showError(error);
        });
    }).catch(message => {
      this.hideLoading();
      this.showError({ message });
    });
  }

  logInWithGitHub() {
    this.showLoading();
    this.oauth.logInVia(this.githubProvider).then(response => {
      window.cordovaHTTP.post('https://github.com/login/oauth/access_token', {
        client_id: GitHubInfo.clientId,
        client_secret: GitHubInfo.clientSecret,
        code: get(response, 'code'),
        state: GitHubInfo.state,
      }, {
        Accept: 'application/json',
      },
        response => {
          const data = JSON.parse(response.data);
          const credential = firebase.auth.GithubAuthProvider.credential(data.access_token);
          this.authService.logInWithCredential(credential, AuthProviders.Github)
            .then(_ => {
              this.hideLoading();
              this.dismiss();
            }).catch(error => {
              this.hideLoading();
              this.showError(error);
            });
        },
        response => {
          this.hideLoading();
          this.showError({
            message: response.error,
          });
        }
      );
    }, error => {
      this.hideLoading();
      this.showError(error);
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  protected getLoadingMessage(): string {
    return 'Log in...';
  }

  protected getErrorMessage(error: any): string {
    return `Failed to log in. Please check your email and password. The error message is ${error.message}.`;
  }
}
