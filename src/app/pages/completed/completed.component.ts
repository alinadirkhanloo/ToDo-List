import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from 'src/app/components/task/task.component';
import { ToDoTask } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule, TaskComponent, MatSidenavModule],
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedTasksComponent implements OnInit {
  title = 'Completed Tasks';
  private _taskService = inject(TaskService);

  tasks: ToDoTask[] | null = null;
  selctedTaskId: string | null = null;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._taskService.getList().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
    });
  }

  deleteTask(id: string | undefined) {
    if (id) {
      this._taskService.delete(id).subscribe({
        next: (value) => {
          this.loadData();
        },
      });
    }
  }

  editTask(id: string | undefined) {
    if (id) {
      this.selctedTaskId = id;
    }
  }
}
