import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private activeItem: string;

  constructor() {
    this.activeItem = '';
  }

  changeActive(item: string) {
    this.activeItem = item;
  }

  getActive(): string {
    return this.activeItem;
  }
}
