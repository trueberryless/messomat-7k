import { Component } from '@angular/core';

import { Status } from '@app/_models';
import { BackendService } from '@app/_services';

import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-fan',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule],
  templateUrl: './fan.component.html',
  styleUrl: './fan.component.scss',
})
export class FanComponent {
  status: Status = new Status();
  isOn = false;
  timer: any;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getStatus().then((status) => {
      this.status = status;
      this.isOn = status.fanOn == 1 ? true : false;
    });
    this.timer = setInterval(() => {
      this.update();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private update() {
    this.backendService.getStatus().then((fan) => {
      this.status = fan;
      this.isOn = fan.fanOn == 1 ? true : false;
    });
  }

  public setFan(event: MatSlideToggleChange) {
    const on = event.checked ? 1 : 0;
    this.backendService.setFan(on);
  }
}
