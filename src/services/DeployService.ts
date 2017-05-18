import { Injectable } from '@angular/core';
import { Deploy } from '@ionic/cloud-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class DeployService {
  constructor(private deploy: Deploy,
              private alertCtrl: AlertController) {
  }

  checkForUpdates() {
    this.deploy.check().then(hasUpdate => {
      if (hasUpdate) {
        this.confirmUpdate();
      }
    });
  }

  install() {
    this.deploy.download()
      .then(() => this.deploy.extract()
        .then(() => this.deploy.load()));
  }

  private confirmUpdate() {
    const confirm = this.alertCtrl.create({
      title: 'New version available',
      message: 'A new version is available. Do you want to update and reload the app?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            confirm.dismiss();
          }
        },
        {
          text: 'Update & Reload',
          handler: () => {
            confirm.dismiss();
            this.install();
          }
        }
      ]
    });
    confirm.present();
  }
}