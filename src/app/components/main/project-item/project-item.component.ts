import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from '../../../services/project.service';
import { ComponentCommunicationService } from '../../../services/component-communication.service';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../helper/confirmation/confirmation.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Project;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
  }

  confirmDeletion() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {message: 'Are you sure you want to delete this project?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 0) {
        this.projectService.deleteProject(this.project.projectIdentifier).subscribe(value => {
          this.componentCommunicationService.setDeletedProjectIndex(this.project.projectIdentifier);
        }, error => {
        });
      }
    });
  }

}
