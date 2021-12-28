import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private timerSubscription: Subscription | undefined;
  constructor() {}

  ngOnInit() {
    this.timerSubscription = interval(1000).subscribe((count: number) => {
      console.log(count);
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) this.timerSubscription.unsubscribe();
  }
}
