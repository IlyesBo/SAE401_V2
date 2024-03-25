import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private isGreenPanier: boolean;

  constructor() {
    this.isGreenPanier = false;
  }

  greenPanier(isGreen: boolean) {
    this.isGreenPanier = isGreen;
  }

  isPanierGreen(): boolean {
    return this.isGreenPanier;
  }
}
