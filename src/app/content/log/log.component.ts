import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  logs: string[] = [];

  ngOnInit() {
    this.logs = ['Item 1'];

    // Call the updateList function every second
    setInterval(() => {
      this.updateList();
    }, 1000);
  }

  private updateList() {
    // Update the logs with new values
    const newItem = 'Item ' + (this.logs.length + 1);

    // Add new item to the beginning of the array
    this.logs.unshift(newItem);

    // Remove the last item if the array exceeds a certain length (for demonstration purposes)
    const maxLength = 15;
    if (this.logs.length > maxLength) {
      this.logs.pop();
    }
  }
}
