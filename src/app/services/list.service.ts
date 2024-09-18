import { Injectable, signal } from '@angular/core';
import { GenericApiService } from './generic-api.service';
import { HttpClient } from '@angular/common/http';
import { ToDoList } from '../models/list';
import { ToDoTask } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class ListService extends GenericApiService<ToDoList> {
  constructor(http: HttpClient) {
    super(http, 'lists');
  }
}
