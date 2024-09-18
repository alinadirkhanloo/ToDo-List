import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskService } from 'src/app/services/task.service';
import { ToDoTask } from 'src/app/models/task';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss'],
})
export class TaskNewComponent {
  private _todoTaskService = inject(TaskService);
  task: ToDoTask | null = null;

  @Input() listId: string | null = null;

  @Output() afterSave = new EventEmitter<boolean>();

  afterFormSaveClicke(newTask: ToDoTask) {
    this._todoTaskService.create(newTask).subscribe({
      next: (value) => {
        this.afterSave.emit(true);
      },
    });
  }
}
