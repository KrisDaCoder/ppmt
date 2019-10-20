import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  editProjectForm: FormGroup;
  errors: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) {
      this.cleanErrorObject();
     }

  ngOnInit() {
    this.editProjectForm = new FormGroup({
      id: new FormControl(''),
      projectName: new FormControl(''),
      projectIdentifier: new FormControl({value: '', disabled: true}),
      description: new FormControl(''),
      startDate: new FormControl({value: '', disabled: true}),
      endDate: new FormControl(''),
    });
    const projectIdentifier = this.route.snapshot.paramMap.get('projectIdentifier');
    this.projectService.getProject(projectIdentifier).subscribe(value => {
      this.editProjectForm.get('id').setValue(value.id);
      this.editProjectForm.get('projectName').setValue(value.projectName);
      this.editProjectForm.get('projectIdentifier').setValue(value.projectIdentifier);
      this.editProjectForm.get('description').setValue(value.description);
      this.editProjectForm.get('startDate').setValue(value.startDate);
      this.editProjectForm.get('endDate').setValue(value.endDate);
    });
  }

  onSubmit() {
    this.projectService.addProject(this.editProjectForm.getRawValue()).subscribe(data => {
      this.cleanErrorObject();
      this.editProjectForm.reset();
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
