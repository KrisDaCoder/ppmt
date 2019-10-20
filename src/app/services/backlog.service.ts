import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectTask } from '../models/ProjectTask';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  private requestMapping = '/backlog';

  constructor(private httpClient: HttpClient) { }

  getProjectTasks(projectIdentifier: string): Observable<ProjectTask[]> {
    return this.httpClient.get<ProjectTask[]>(`${environment.BACKEND_URL}${this.requestMapping}/${projectIdentifier}`);
  }

  addProjectTask(projectIdentifier: string, projectTask: ProjectTask): Observable<ProjectTask> {
    return this.httpClient.post<ProjectTask>(`${environment.BACKEND_URL}${this.requestMapping}/${projectIdentifier}`, projectTask);
  }

  getProjectTask(projectIdentifier: string, projectSequence: string): Observable<ProjectTask> {
    return this.httpClient.get<ProjectTask>(`${environment.BACKEND_URL}${this.requestMapping}/${projectIdentifier}/${projectSequence}`);
  }

  updateProjectTask(projectIdentifier: string, projectSequence: string, projectTask: ProjectTask): Observable<ProjectTask> {
    return this.httpClient.patch<ProjectTask>(`${environment.BACKEND_URL}${this.requestMapping}/${projectIdentifier}/${projectSequence}`, projectTask);
  }

  deleteProjectTask(projectIdentifier: string, projectSequence: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.BACKEND_URL}${this.requestMapping}/${projectIdentifier}/${projectSequence}`);
  }

}
