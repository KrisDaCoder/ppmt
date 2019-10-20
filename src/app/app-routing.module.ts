import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { AddProjectComponent } from './components/main/add-project/add-project.component';
import { EditProjectComponent } from './components/main/edit-project/edit-project.component';
import { ProjectBoardComponent } from './components/main/project-board/project-board.component';
import { AddProjectTaskComponent } from './components/main/add-project-task/add-project-task.component';
import { UpdateProjectTaskComponent } from './components/main/update-project-task/update-project-task.component';
import { LandingComponent } from './components/layout/landing/landing.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  // public routes
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // private routes
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'addProject', component: AddProjectComponent, canActivate: [AuthGuard]},
  {path: 'editProject/:projectIdentifier', component: EditProjectComponent, canActivate: [AuthGuard]},
  {path: 'projectBoard/:projectIdentifier', component: ProjectBoardComponent, canActivate: [AuthGuard]},
  {path: 'addProjectTask/:projectIdentifier', component: AddProjectTaskComponent, canActivate: [AuthGuard]},
  {path: 'updateProjectTask/:projectIdentifier/:projectSequence', component: UpdateProjectTaskComponent, canActivate: [AuthGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
