import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from 'src/app/components/task/task.component';
import { ToDoTask } from 'src/app/models/task';
import { TaskNewComponent } from 'src/app/components/task-new/task-new.component';
import { ListService } from '../../services/list.service';
import { TaskService } from 'src/app/services/task.service';
import { ToDoList } from 'src/app/models/list';
import { TaskEditComponent } from '../../components/task-edit/task-edit.component';
import { MatSidenavModule } from '@angular/material/sidenav';

type FormMode = 'Edit' | 'New' | '';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    TaskNewComponent,
    TaskEditComponent,
    MatSidenavModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _listService = inject(ListService);
  private _taskService = inject(TaskService);

  tasks: ToDoTask[] | null = null;
  selctedList: ToDoList | null = null;
  selctedTaskId: string | null = null;
  showFiller = false;
  formsMode: FormMode = '';
  id: string | null = null;

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadData();
      this.loadList();
    });
  }

  loadData() {
    if (this.id) {
      this._listService.getOne(this.id).subscribe({
        next: (list) => {
          this.selctedList = list;
        },
      });
    }
  }

  loadList() {
    this._taskService.getList().subscribe({
      next: (tasks) => {
        this.tasks = tasks.filter((itm) => itm.list === this.selctedList?._id);
      },
    });
  }

  afterSave() {
    this.loadList();
    this.selctedTaskId = null;
  }

  updateTask(isDone: boolean, id: string | undefined) {
    if (id) {
      this._taskService.update(id, { done: isDone }).subscribe();
    }
  }

  deleteTask(id: string | undefined) {
    if (id) {
      this._taskService.delete(id).subscribe();
    }
  }

  editTask(id: string | undefined) {
    if (id) {
      this.selctedTaskId = id;
    }
  }

  changeFormMode(mode: FormMode) {
    this.formsMode = mode;
  }
}
