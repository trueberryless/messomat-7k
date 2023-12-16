import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Data, Status } from '@app/_models';
import { BackendService } from '@app/_services';

import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent {
  data: Data[] = [];
  status: Status = new Status();
  sendMode = false;
  on = true;
  timer: any;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.data = data;
      });
    this.backendService.getStatus().then((status) => {
      this.status = status;
      this.sendMode = status.speed == 'fast' ? true : false;
    });

    this.timer = setInterval(() => {
      this.update();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  update() {
    this.backendService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.data = data;
      });
  }

  public setSendMode(event: MatSlideToggleChange) {
    const sendMode = event.checked ? 'fast' : 'slow';
    this.backendService.setSendMode(sendMode);
  }

  public setOnOff(event: MatSlideToggleChange) {
    const on = event.checked;
    if (on) {
      this.backendService.setOn();
    } else {
      this.backendService.setOff();
    }
  }
}
