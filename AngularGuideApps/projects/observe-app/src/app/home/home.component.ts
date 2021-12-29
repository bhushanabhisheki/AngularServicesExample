import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  interval,
  map,
  observable,
  Observable,
  pipe,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private timerSubscription: Subscription | undefined;
  private customSubscription: Subscription | undefined;
  constructor() {}

  ngOnInit() {
    // this.timerSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // });

    let count = 0;
    let customIntervalObservable = Observable.create((observer: any) => {
      setInterval(() => {
        observer.next(count * 4);
        count++;
      }, 1000);
    });

    this.customSubscription = customIntervalObservable
      .pipe(
        map((data: number) => {
          return 'Round: ' + data;
        })
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    //if (this.timerSubscription) this.timerSubscription.unsubscribe();
    if (this.customSubscription) this.customSubscription.unsubscribe();
  }
}
