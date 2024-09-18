import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoList } from 'src/app/models/list';
import { ListNewComponent } from '../list-new/list-new.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataHandlerService } from 'src/app/services/data-handler.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ListNewComponent,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private _todoListService = inject(ListService);
  private _dataHandlerService = inject(DataHandlerService);

  lists: ToDoList[] | null = null;
  editingItemId: string | null = null;
  newTitle: string = '';

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this._todoListService
      .getList()
      .pipe(
        map((data) => {
          return data.sort((a, b) => {
            if (a.isMain) return -1;
            else return 1;
          });
        })
      )
      .subscribe({
        next: (lists) => {
          this.lists = lists;
        },
      });
  }
  startEditing(item: any) {
    this.editingItemId = item._id;
    this.newTitle = item.title;
  }

  saveTitle(item: ToDoList) {
    if (this.editingItemId === item._id) {
      item.title = this.newTitle;
      this.editingItemId = null;
      this._todoListService.update(item._id, item).subscribe();
    }
  }
  deleteList(event: any, id: string) {
    event.stopPropagation();
    this._todoListService.delete(id).subscribe({
      next: (rs) => {
        this.loadData();
      },
    });
  }

  afterSave(ev: any) {
    this.loadData();
  }
}
