import { Injectable } from '@angular/core';
import { GenericApiService } from './generic-api.service';
import { HttpClient } from '@angular/common/http';
import { ToDoTask } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends GenericApiService<ToDoTask> {
  constructor(http: HttpClient) {
    super(http, 'tasks');
  }
}
