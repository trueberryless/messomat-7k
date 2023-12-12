import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Fan } from '@app/_models';

import { BackendService } from '@app/_services';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-fan',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fan.component.html',
  styleUrl: './fan.component.scss',
})
export class FanComponent {
  fan: Fan = new Fan();
  isOn = false;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getStatus().then((fan) => {
      this.fan = fan;
      this.isOn = fan.fanOn == 1 ? true : false;
    });
    setInterval(() => {
      this.update();
    }, 4000);
  }

  private update() {
    this.backendService.getStatus().then((fan) => {
      this.fan = fan;
      this.isOn = fan.fanOn == 1 ? true : false;
    });
  }

  public setFan(on: boolean) {
    this.backendService.setFan(on ? 1 : 0);
  }
}
