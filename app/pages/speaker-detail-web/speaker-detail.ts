import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, Page} from 'ionic-angular';
import {SessionDetailPage} from '../session-detail/session-detail';


@Component({
  templateUrl: 'build/pages/speaker-detail-web/speaker-detail.html'
})
export class SpeakerDetailWebPage {
  speaker: any;

  constructor(private viewCtrl: ViewController, private nav: NavController, private navParams: NavParams) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`);
  }
  close() {
    this.viewCtrl.dismiss();
}
}
