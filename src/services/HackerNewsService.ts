import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";

const HACKER_NEWS_API_URL = 'https://hacker-news.firebaseio.com';
const config = {
  databaseURL: HACKER_NEWS_API_URL,
};

@Injectable()
export class HackerNewsService {
  database: firebase.database.Database;
  constructor(private af: AngularFire) {
    const app = firebase.initializeApp(config, 'HackerNews');
    this.database = app.database();
  }

  topStories(): FirebaseListObservable<any> {
    const ref = this.database.ref('/v0/topstories');
    return this.af.database.list(ref);
  }

  item(id: number): FirebaseObjectObservable<any> {
    const ref = this.database.ref(`/v0/item/${id}`);
    return this.af.database.object(ref);
  }
}
