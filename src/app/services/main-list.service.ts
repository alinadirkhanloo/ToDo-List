import { Injectable, signal } from '@angular/core';
import { GenericApiService } from './generic-api.service';
import { HttpClient } from '@angular/common/http';
import { ToDoList } from '../models/list';

@Injectable({
  providedIn: 'root',
})
export class MainListService extends GenericApiService<ToDoList> {
  constructor(http: HttpClient) {
    super(http, 'mainList');
  }
}
