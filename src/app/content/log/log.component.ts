import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';
import { Data } from '@app/_models';

import { BackendService } from '@app/_services';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  logs: Data[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService
      .getAll()
      .pipe(first())
      .subscribe((logs) => {
        this.logs = logs.reverse();
      });
    setInterval(() => {
      this.updateList();
    }, 1000);
  }

  private updateList() {
    this.backendService
      .getAll()
      .pipe(first())
      .subscribe((logs) => {
        this.logs = logs.reverse();
      });
  }
}
