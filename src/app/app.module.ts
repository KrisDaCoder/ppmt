import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { ProjectItemComponent } from './components/main/project-item/project-item.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AddProjectComponent } from './components/main/add-project/add-project.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditProjectComponent } from './components/main/edit-project/edit-project.component';
import { ConfirmationComponent } from './components/helper/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectBoardComponent } from './components/main/project-board/project-board.component';
import { ProjectTaskComponent } from './components/main/project-task/project-task.component';
import { AddProjectTaskComponent } from './components/main/add-project-task/add-project-task.component';
import { UpdateProjectTaskComponent } from './components/main/update-project-task/update-project-task.component';
import { LandingComponent } from './components/layout/landing/landing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TokenInterceptor } from './components/auth/interceptors/token.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectItemComponent,
    HeaderComponent,
    AddProjectComponent,
    EditProjectComponent,
    ConfirmationComponent,
    ProjectBoardComponent,
    ProjectTaskComponent,
    AddProjectTaskComponent,
    UpdateProjectTaskComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ConfirmationComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
