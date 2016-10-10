import { Component } from '@angular/core';
import { PopoverController, ViewController } from 'ionic-angular';

class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'build/pages/sponsors/sponsors.html'
})
export class SponsorsPage {
  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
