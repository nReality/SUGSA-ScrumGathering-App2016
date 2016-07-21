import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {NavParams, Storage, LocalStorage, Alert, NavController} from 'ionic-angular';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {Device} from 'ionic-native';
import { Star } from './star';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/session-detail/session-detail.html',
  directives: [Star]
})
export class SessionDetailPage {
  session: any;
  stars: number[] = [1,2,3,4,5];
  comment: string = "";
  local: any;
  ratingsRef: any;
  nav: NavController = null;

  @Input() rating: number = 0;
  @Output() rate = new EventEmitter();
  _rating = this.rating;

  constructor(private navParams: NavParams, nav: NavController) {
    this.session = navParams.data;
    this.nav = nav;

    this.initializeStorage();
    this.restoreState();
  }

  initializeStorage(){
    this.ratingsRef = firebase.database().ref('Ratings');
    this.local = new Storage(LocalStorage);
  }

  restoreState(){
    this.local.get(this.session.name).then((data) => {
      var storedRating = JSON.parse(data);

      if(data){
        this.onRate(storedRating.value);
        this.comment = storedRating.comment;
      }
    });
  }

  onRate(star) {
    this.rate.emit(star);
    this._rating = star;
  }

  postRating(session){
    this.ratingsRef.push({session:session.name, deviceID: Device.device.uuid || "Web", value: this._rating, comment:this.comment});
    this.local.set(session.name, JSON.stringify({value: this._rating, comment: this.comment}));

    this.showSuccess();
  }

  showSuccess(){
    let postMessage = Alert.create({
      title: 'Thank you!',
      message: 'Your feedback has been received.',
      buttons: ['OK']
    });

    this.nav.present(postMessage);
  }

  goToSpeakerDetail(speakerName: string) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  goToTwitter(sessionName) {    
    window.open(`https://twitter.com/share?text=` + sessionName);
  }
}
