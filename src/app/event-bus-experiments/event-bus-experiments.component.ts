import { Component, OnInit } from '@angular/core';
import { testLessons } from '../shared/model/test-lessons';
import { Lesson } from '../shared/model/lesson';
import { store } from './app-data';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('Top level component brodcasted all lessons');

    store.initializeLessonsList(testLessons.slice(0));


    setTimeout(() => {

      const newLesson: Lesson = {
        id: Math.random(),
        description: 'New lesson arriving from backend'
      }

      store.addLesson(newLesson);

    }, 3000);

  }

  addLesson(lessonText: string) {
    const newLesson: Lesson = {
      id: Math.random(),
      description: lessonText
    }

    store.addLesson(newLesson);
  }

}
