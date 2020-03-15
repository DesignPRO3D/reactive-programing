import { Component } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import { store, Observer } from '../event-bus-experiments/app-data';


@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer  {

  lessonsCounter = 0;

  constructor() {
    console.log('lesson list component is required as observer');

    store.subscribe(this);
  }


  next(data: Lesson[]) {
    console.log('Counter component received data');
    this.lessonsCounter = data.length;
  }

}
