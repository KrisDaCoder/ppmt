import { Component, OnInit, Input } from '@angular/core';
import { ProjectTask } from 'src/app/models/ProjectTask';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../helper/confirmation/confirmation.component';
import { ComponentCommunicationService } from '../../../services/component-communication.service';
import { BacklogService } from '../../../services/backlog.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {

  @Input() projectTask: ProjectTask;
  priorityString: string;
  priorityClass: string;

  constructor(private dialog: MatDialog,
              private componentCommunicationService: ComponentCommunicationService,
              private backlogService: BacklogService) { }

  ngOnInit() {
    switch (this.projectTask.priority.toString()) {
      case '1':
        this.priorityString = 'HIGH';
        this.priorityClass = 'bg-danger text-light';
        break;
      case '2':
        this.priorityString = 'MEDIUM';
        this.priorityClass = 'bg-warning text-light';
        break;
      case '3':
        this.priorityString = 'LOW';
        this.priorityClass = 'bg-info text-light';
        break;
      default:
        console.log('Unknown Priority Value!');
    }
  }

  confirmDeletion() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {message: 'Are you sure you want to delete this project task?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 0) {
        this.backlogService.deleteProjectTask(this.projectTask.projectIdentifier, this.projectTask.projectSequence).subscribe(value => {
          this.componentCommunicationService.setDeletedProjectTask(this.projectTask);
          console.log('Project task was deleted!');
        }, error => {
          console.log('Project task could not be deleted!');
        });
      }
    });
  }

}
