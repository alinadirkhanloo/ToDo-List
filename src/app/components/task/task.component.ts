import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToDoTask } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task: ToDoTask | null = null;
  @Input() editable: boolean = true;
  @Output() afterDeleteClicked = new EventEmitter<string>();
  @Output() afterEditClicked = new EventEmitter<string>();
  @Output() aftercheckClicked = new EventEmitter<boolean>();

  deleteTask(id: string | undefined) {
    this.afterDeleteClicked.emit(id);
  }

  editTask(id: string | undefined) {
    this.afterEditClicked.emit(id);
  }

  checkAsDone(checked: boolean) {
    if (this.task) {
      this.task.done = checked;

      this.aftercheckClicked.emit(checked);
    }
  }
}
