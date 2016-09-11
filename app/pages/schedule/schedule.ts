import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/schedule/schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  dayIndex = 0;

  queryText = '';
  segment = 'all';
  excludeTracks = [];
  excludeLocations = [];
  locations: Array<{name: string,hide: boolean}> = [];
  excludeDays = [];
  flatGroups = [];

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public user: UserData
  ) {

    this.confData.data.locations.forEach(locationName => {

          this.locations.push({
            name: locationName,
            hide: false
          });
    });

  }
  toggleLocation(locationName){
    this.excludeLocations = [];
    this.locations.forEach(location => {
      if (location.name == locationName){
        location.hide = !location.hide;
      }
      if (location.hide){
        this.excludeLocations.push(location.name);
      }
    });
    this.updateSchedule();
  }

  toggleDay(dateString){
    this.excludeDays = [];
    this.confData.data.schedule.forEach(day => {
      if (day.date == dateString){
        day.hide = !day.hide;
      }
      if (day.hide){
        this.excludeDays.push(day.date);
      }
    });
    this.updateSchedule();
  }
  ionViewDidEnter() {
    this.app.setTitle('Schedule');
  }

  ngAfterViewInit() {
    this.updateSchedule();
  }


  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.excludeLocations, this.excludeDays, this.segment).then(data => {
      this.flatGroups = data;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, sessionData);
  }

  markAsFavorite(sessionData) {

    sessionData.isFavourite = true;
  }

  markAsNotFavorite(sessionData) {
    sessionData.isFavourite = false;
  }

  locationNoSpaces(location){
    return (!location) ? '' : location.replace(/ /g, '');
  }
}
