import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogService } from 'src/app/services/backlog.service';
import { ProjectTask } from 'src/app/models/ProjectTask';
import { ComponentCommunicationService } from '../../../services/component-communication.service';


@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {

  projectIdentifier: string;
  toDoProjectTasks: ProjectTask[];
  inProgressProjectTasks: ProjectTask[];
  doneProjectsTasks: ProjectTask[];


  constructor(
    private route: ActivatedRoute,
    private backlogService: BacklogService,
    private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
    this.projectIdentifier = this.route.snapshot.paramMap.get('projectIdentifier');
    this.backlogService.getProjectTasks(this.projectIdentifier).subscribe(data => {
      this.toDoProjectTasks = data.filter(projectTask => projectTask.status === 'TO_DO');
      this.inProgressProjectTasks = data.filter(projectTask => projectTask.status === 'IN_PROGRESS');
      this.doneProjectsTasks = data.filter(projectTask => projectTask.status === 'DONE');
    });

    this.componentCommunicationService.deletedProjectTask.subscribe(projectTaskToBeDeleted => {
      if (projectTaskToBeDeleted !== null) {
        switch (projectTaskToBeDeleted.status) {
          case 'TO_DO':
            this.toDoProjectTasks.forEach((projectTask, index) => {
              if (projectTask.projectSequence === projectTaskToBeDeleted.projectSequence) {
                this.toDoProjectTasks.splice(index, 1);
              }
            });
            break;
          case 'IN_PROGRESS':
            this.inProgressProjectTasks.forEach((projectTask, index) => {
              if (projectTask.projectSequence === projectTaskToBeDeleted.projectSequence) {
                this.inProgressProjectTasks.splice(index, 1);
              }
            });
            break;
          case 'DONE':
            this.doneProjectsTasks.forEach((projectTask, index) => {
              if (projectTask.projectSequence === projectTaskToBeDeleted.projectSequence) {
                this.doneProjectsTasks.splice(index, 1);
              }
            });
            break;
          default:
            console.log('Unknown Project Task Status!');
        }
      }
    });

  }

}
