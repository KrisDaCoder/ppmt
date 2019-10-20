import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private requestMapping = '/project';

  constructor(private httpClient: HttpClient) { }

  addProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(environment.BACKEND_URL + this.requestMapping, project);
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(environment.BACKEND_URL + this.requestMapping + "/all");
  }

  getProject(projectIdentifier: string): Observable<Project> {
    return this.httpClient.get<Project>(environment.BACKEND_URL + this.requestMapping + `/${projectIdentifier}`);
  }

  deleteProject(projectIdentifier: string): Observable<void> {
    return this.httpClient.delete<void>(environment.BACKEND_URL + this.requestMapping + `/${projectIdentifier}`);
  }

}
