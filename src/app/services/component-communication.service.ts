import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectTask } from '../models/ProjectTask';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  private indexSource = new BehaviorSubject<string>(null);
  deletedProject = this.indexSource.asObservable();
  private projectTaskSource = new BehaviorSubject<ProjectTask>(null);
  deletedProjectTask = this.projectTaskSource.asObservable();

  constructor() { }

  setDeletedProjectIndex(index: string) {
    this.indexSource.next(index);
  }

  setDeletedProjectTask(projectTask: ProjectTask) {
    this.projectTaskSource.next(projectTask);
  }

}
