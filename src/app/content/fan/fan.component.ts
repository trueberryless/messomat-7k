import { Component } from '@angular/core';

import { Status } from '@app/_models';
import { BackendService } from '@app/_services';

import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

import { NgClass } from '@angular/common';

@Component({
  selector: 'app-fan',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule, NgClass],
  templateUrl: './fan.component.html',
  styleUrl: './fan.component.scss',
})
export class FanComponent {
  status: Status = new Status();
  isOn = false;
  timer: any;
  currentFanClasses: Record<string, boolean> = {};

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.status.fanOn = 0;
    this.update();
    this.timer = setInterval(() => {
      this.update();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private update() {
    const oldState = this.status;

    this.backendService.getStatus().then((fan) => {
      this.status = fan;
      this.isOn = fan.fanOn == 1 ? true : false;

      if (oldState.fanOn != this.status.fanOn) {
        if (this.status.fanOn == 1) {
          this.setFanCurrentClasses('start');
          setTimeout(() => {
            this.setFanCurrentClasses('rotating');
          }, 2000);
        } else {
          this.setFanCurrentClasses('stop');
          setTimeout(() => {
            this.setFanCurrentClasses('still');
          }, 2000);
        }
      }
    });
  }

  setFanCurrentClasses(current: string = 'still') {
    // CSS classes: added/removed per current state of component properties
    this.currentFanClasses = {
      fan: true,
      still: current == 'still',
      start: current == 'start',
      rotating: current == 'rotating',
      stop: current == 'stop',
    };
  }

  public setFan(event: MatSlideToggleChange) {
    const on = event.checked ? 1 : 0;
    this.backendService.setFan(on);
  }
}
