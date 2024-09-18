import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: 'list/completed-tasks',
        loadComponent: () =>
          import('./pages/completed/completed.component').then(
            (c) => c.CompletedTasksComponent
          ),
      },
      {
        path: 'list/:id/tasks',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((c) => c.TasksComponent),
      },
      {
        path: 'list/:id/tasks/:taskId',
        loadComponent: () =>
          import('./components/task-edit/task-edit.component').then(
            (c) => c.TaskEditComponent
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
