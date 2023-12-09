import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';
import { Data } from '../../_models/data';
import { BackendService } from '@app/_services/backend.service';

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
