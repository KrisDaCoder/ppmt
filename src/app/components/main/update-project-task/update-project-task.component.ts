import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BacklogService } from '../../../services/backlog.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-update-project-task',
  templateUrl: './update-project-task.component.html',
  styleUrls: ['./update-project-task.component.css']
})
export class UpdateProjectTaskComponent implements OnInit {

  updateProjectTaskForm: FormGroup;
  errors: any;
  projectIdentifier: string;
  projectSequence: string;
  project: Project = {
    projectName: '',
    projectIdentifier: ''
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private backlogService: BacklogService,
              private projectService: ProjectService) {
                this.cleanErrorObject();
  }

  ngOnInit() {
    this.updateProjectTaskForm = new FormGroup({
      id: new FormControl(''),
      summary: new FormControl(''),
      acceptanceCriteria: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(0),
      dueDate: new FormControl(''),
    });
    this.projectIdentifier = this.route.snapshot.paramMap.get('projectIdentifier');
    this.projectSequence = this.route.snapshot.paramMap.get('projectSequence');
    this.projectService.getProject(this.projectIdentifier).subscribe(project => {
      this.project = project;
    });
    this.backlogService.getProjectTask(this.projectIdentifier, this.projectSequence).subscribe(data => {
      this.updateProjectTaskForm.get('id').setValue(data.id);
      this.updateProjectTaskForm.get('summary').setValue(data.summary);
      this.updateProjectTaskForm.get('acceptanceCriteria').setValue(data.acceptanceCriteria);
      this.updateProjectTaskForm.get('status').setValue(data.status);
      this.updateProjectTaskForm.get('priority').setValue(data.priority);
      this.updateProjectTaskForm.get('dueDate').setValue(data.dueDate);
    });
  }

  onSubmit() {
    if (typeof this.updateProjectTaskForm.value.priority === 'string') {
      this.updateProjectTaskForm.value.priority = parseInt(this.updateProjectTaskForm.value.priority);
    }
    this.backlogService.updateProjectTask(this.projectIdentifier, this.projectSequence, this.updateProjectTaskForm.value)
      .subscribe(data => {
        this.cleanErrorObject();
        this.updateProjectTaskForm.reset();
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
