import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MainListService } from 'src/app/services/main-list.service';
import { ToDoList } from 'src/app/models/list';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;
  private _mainListService = inject(MainListService);
  private _dataHandlerService = inject(DataHandlerService);

  lists: ToDoList[] | null = null;
  mainList: ToDoList | null = null;
  ngOnInit(): void {
    this._mainListService.getOne().subscribe({
      next: (mainList) => {
        this._dataHandlerService.mainListId.set(mainList._id);
        this.loading = true;
        console.log(this._dataHandlerService.mainListId());
      },
    });
  }
}
