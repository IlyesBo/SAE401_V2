import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  
  private _totalPrix: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPrix = this._totalPrix.asObservable();

  private _panier: any[] = [];
  get panier(): any[] {
    return this._panier;
  }

  constructor() { }

  checkNewPanier() {
    // Vérifier s'il y a un nouveau panier
    // (vous pouvez ajouter votre logique ici si nécessaire)
  }

  calculTotal() {
    let total = 0;
    for (let item of this._panier) {
      total += item.prixUnite * item.quantite;
    }
    this._totalPrix.next(total);
  }

  supprimerDuPanier(index: number) {
    if (index >= 0 && index < this._panier.length) {
      this._panier.splice(index, 1);
    }
  }

  mettreAJourPanier() {
    // Mettre à jour le panier dans le stockage local ou envoyer au backend
    // (vous pouvez ajouter votre logique ici si nécessaire)
  }

  commander() {
    // Gérer la logique de commande ici
    // (vous pouvez ajouter votre logique ici si nécessaire)
  }

  ajouterAuPanier(nouvelElement: any) {
    // Ajouter le nouvel élément au panier
    this._panier.push(nouvelElement);
    // Recalculer le total du panier
    this.calculTotal();
    // Mettre à jour le panier dans le stockage local ou envoyer au backend
    this.mettreAJourPanier();
  }
}
