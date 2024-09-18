import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { ToDoTask } from 'src/app/models/task';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnChanges {
  @Input() taskId: string | null = null;
  @Output() afterSave = new EventEmitter<boolean>();

  private _taskService = inject(TaskService);

  task: ToDoTask | null = null;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.taskId) {
      this._taskService.readById(this.taskId).subscribe({
        next: (task: ToDoTask) => {
          this.task = task;
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskId']) {
      this.taskId = changes['taskId'].currentValue;
      this.loadData();
    }
  }

  afterFormSaveClicke(task: ToDoTask) {
    if (this.taskId) {
      this._taskService.update(this.taskId, task).subscribe({
        next: (value) => {
          this.afterSave.emit(true);
        },
      });
    }
  }
}
