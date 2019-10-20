import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BacklogService } from '../../../services/backlog.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-add-project-task',
  templateUrl: './add-project-task.component.html',
  styleUrls: ['./add-project-task.component.css']
})
export class AddProjectTaskComponent implements OnInit {

  addProjectTaskForm: FormGroup;
  projectIdentifier: string;
  errors: any;
  project: Project = {
    projectName: '',
    projectIdentifier: ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private backlogService: BacklogService) {
                this.cleanErrorObject();
  }

  ngOnInit() {
    this.projectIdentifier = this.route.snapshot.paramMap.get('projectIdentifier');
    this.projectService.getProject(this.projectIdentifier).subscribe(project => {
      this.project = project;
    });
    this.addProjectTaskForm = new FormGroup({
      summary: new FormControl(''),
      acceptanceCriteria: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(0),
      dueDate: new FormControl(''),
    });
  }

  onSubmit() {
    if (typeof this.addProjectTaskForm.value.priority === 'string') {
      this.addProjectTaskForm.value.priority = parseInt(this.addProjectTaskForm.value.priority);
    }
    this.backlogService.addProjectTask(this.projectIdentifier, this.addProjectTaskForm.value).subscribe(data => {
      this.cleanErrorObject();
      this.addProjectTaskForm.reset();
      this.router.navigate([`projectBoard/${this.projectIdentifier}`]);
    }, error => {
      this.cleanErrorObject();
      this.assignErrors(error.error);
    });
  }

  cleanErrorObject() {
    this.errors = {
      summary: ''
    };
  }

  assignErrors(error: any) {
    if (error.summary) {
      this.errors.summary = error.summary;
    }
  }

}
