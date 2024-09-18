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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToDoTask } from 'src/app/models/task';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnChanges {
  private _dataHandlerService = inject(DataHandlerService);

  @Input() task: ToDoTask | null = null;
  @Input() listId: string | null = null;
  mainListId: string | null = null;
  @Output() afterSave = new EventEmitter<ToDoTask>();

  private _fb = inject(FormBuilder);

  editTaskForm!: FormGroup;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.editTaskForm = this._fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      date: new FormControl(new Date()),
      description: new FormControl(''),
      done: new FormControl(false),
      list: new FormControl(''),
    });
    if (this.task) this.editTaskForm.patchValue(this.task);
    else this.editTaskForm.patchValue({ list: this.listId });
    this.mainListId = this._dataHandlerService.mainListId();
  }

  onSubmit() {
    if (this.editTaskForm.invalid) return;
    this.afterSave.emit(this.editTaskForm.value as ToDoTask);
    this.editTaskForm.reset();
  }

  MoveToMainList() {
    if (this.editTaskForm.invalid) return;
    else {
      this.editTaskForm.patchValue({ list: this.mainListId });
      this.afterSave.emit(this.editTaskForm.value as ToDoTask);
    }
  }

  get isMainList() {
    // console.log(this.task, this.mainListId, this.listId, this.task?._id);

    return this.task == null
      ? this.mainListId == this.listId
      : this.mainListId == this.task.list;
  }
}
