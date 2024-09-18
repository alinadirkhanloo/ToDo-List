import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataHandlerService {
  mainListId = signal<string | null>(null);
}
