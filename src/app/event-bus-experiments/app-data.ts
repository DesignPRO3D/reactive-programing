import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';


export interface Observer {
  next(data:any);
}

export interface Observable {
  subscribe(obs:Observer);
  unsubscribe(obs:Observer);
}

interface Subject extends Observer, Observable {

}

class SubjectImplementation implements Subject {

  private observers: Observer[] = [];

  next(data: any) {
    this.observers.forEach(obs => obs.next(data));
  }

  subscribe(obs: Observer) {
    this.observers.push(obs);
  }

  unsubscribe(obs: Observer) {
    _.remove(this.observers, el => el === obs);
  }

}

class DataStore implements Observable {

  private lessons: Lesson[] = [];

  private lessonsListSubject = new SubjectImplementation();

  subscribe(obs: Observer) {
    this.lessonsListSubject.subscribe(obs);
    obs.next(this.lessons);
  }

  unsubscribe(obs: Observer) {
    this.lessonsListSubject.unsubscribe(obs);
  }

  public lessonsList$: Observable = {
    subscribe: obs => {
      this.lessonsListSubject.subscribe(obs);
      obs.next(this.lessons);
    },
    unsubscribe: obs => this.lessonsListSubject.unsubscribe(obs)
  }

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.clone(newList);
    this.brodcast();
  }

  addLesson(newLesson: Lesson) {
    this.lessons.push(_.clone(newLesson));
    this.brodcast();
  }

  deleteLesson(deleted: Lesson) {
    _.remove(this.lessons, lesson => lesson.id === deleted.id );
    this.brodcast();
  }

  toggleLessonViewd(toggled: Lesson) {
    const lesson = _.find(this.lessons, lesson => lesson.id === toggled.id);

    lesson.completed = !lesson.completed;
    this.brodcast();
  }

  brodcast() {
    this.lessonsListSubject.next(_.cloneDeep(this.lessons));
  }

}

export const store = new DataStore();


