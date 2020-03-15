import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';

import * as _ from 'lodash';
import { store, Observer } from '../event-bus-experiments/app-data';


@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer, OnInit {

  lessons: Lesson[] = [];

  ngOnInit() {
    console.log('Lesson list component is registered as observer');
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('Lessons list component recieve data');
    this.lessons = data.slice(0);
    this.lessons = data;
  }

  toggleLessonViewd(lesson: Lesson) {
    console.log('toggling lesson....');
    store.toggleLessonViewd(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

}
