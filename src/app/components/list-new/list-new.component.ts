import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ToDoList } from 'src/app/models/list';

@Component({
  selector: 'app-list-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss'],
})
export class ListNewComponent {
  private _fb = inject(FormBuilder);
  private _todoListService = inject(ListService);
  @Output() afterSave = new EventEmitter<boolean>();

  newListForm = this._fb.group({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    isMain: new FormControl(false),
    date: new FormControl(new Date()),
  });

  onSubmit() {
    this.newListForm.patchValue({ date: new Date() });
    if (this.newListForm.invalid) return;
    this._todoListService
      .create(this.newListForm.value as ToDoList)
      .subscribe((r) => this.afterSave.emit(true));
    this.newListForm.reset();
  }
}
