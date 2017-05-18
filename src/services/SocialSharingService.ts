import { Injectable } from '@angular/core';
import { SocialSharing } from 'ionic-native';

@Injectable()
export class SocialSharingService {
  share(message: string, url: string) {
    SocialSharing.share(message, null, null, url);
  }
}
