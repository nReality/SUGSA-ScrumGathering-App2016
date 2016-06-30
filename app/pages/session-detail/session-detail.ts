import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Rating} from './rating'

@Component({
  templateUrl: 'build/pages/session-detail/session-detail.html',
  directives: [Rating]
})
export class SessionDetailPage {
  session: any;

  constructor(private navParams: NavParams) {
    this.session = navParams.data;
  }
}
