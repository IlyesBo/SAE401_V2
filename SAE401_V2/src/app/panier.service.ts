// panier.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panier: any[] = [];

  constructor() { }

  ajouterAuPanier(box: any) {
    this.panier.push(box);
  }

  supprimerDuPanier(index: number) {
    this.panier.splice(index, 1);
  }

  calculerTotalPrix(): number {
    let total = 0;
    this.panier.forEach(box => {
      total += box.prixUnite * box.quantite;
    });
    return total;
  }
}
