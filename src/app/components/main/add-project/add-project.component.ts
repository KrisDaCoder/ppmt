import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  createProjectForm: FormGroup;
  errors: any;

  constructor(private projectService: ProjectService,
              private router: Router) {
    this.cleanErrorObject();
   }

  ngOnInit() {
    this.createProjectForm = new FormGroup({
      projectName: new FormControl(''),
      projectIdentifier: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  onSubmit() {
    this.projectService.addProject(this.createProjectForm.value).subscribe(data => {
      this.cleanErrorObject();
      this.createProjectForm.reset();
      this.router.navigate(['/dashboard']);
    }, error => {
      this.cleanErrorObject();
      this.assignErrors(error.error);
    });
  }

  cleanErrorObject() {
    this.errors = {
      description: '',
      projectIdentifier: '',
      projectName: ''
    };
  }

  assignErrors(error: any) {

    if (error.description) {
      this.errors.description = error.description;
    }

    if (error.projectIdentifier) {
      this.errors.projectIdentifier = error.projectIdentifier;
    }

    if (error.projectName) {
      this.errors.projectName = error.projectName;
    }

  }

}
