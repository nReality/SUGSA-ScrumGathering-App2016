import {Component} from '@angular/core';
import {Modal, NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {SpeakerDetailWebPage} from '../speaker-detail-web/speaker-detail';
import {SessionDetailWebPage} from '../session-detail-web/session-detail';


@Component({
  templateUrl: 'build/pages/speaker-list-web/speaker-list-web.html'
})
export class SpeakerListWebPage {
  actionSheet: ActionSheet;
  speakers = [];

  constructor(private nav: NavController, confData: ConferenceData) {
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session) {
    let modal = Modal.create(SessionDetailWebPage,session);
    this.nav.present(modal);
  }

  goToSpeakerDetail(speakerName: string) {
    let modal = Modal.create(SpeakerDetailWebPage,speakerName);
    this.nav.present(modal);
  }

  goToSpeakerTwitter(speaker) {
  setTimeout(function(){ window.open(`https://twitter.com/${speaker.twitter}`); }, 0);

      //this.nav.push(SpeakerDetailPage, speaker.name);
  }

}
