import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/Project';
import { ComponentCommunicationService } from '../../../services/component-communication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: Project[];

  constructor(
    private projectService: ProjectService,
    private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });

    this.componentCommunicationService.deletedProject.subscribe(identifier => {
      if (identifier !== null) {
        this.projects.forEach((project, index) => {
          if (project.projectIdentifier === identifier) {
            this.projects.splice(index, 1);
          }
        });
      }
    });

  }

}
