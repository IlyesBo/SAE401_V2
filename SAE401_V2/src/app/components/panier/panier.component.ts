// panier.component.ts
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  totalPrix: number = 0;

  constructor(public panierService: PanierService) { }

  ngOnInit(): void {
    this.calculerTotalPrix();
  }

  calculerTotalPrix() {
    this.totalPrix = this.panierService.calculerTotalPrix();
  }

  supprimerDuPanier(index: number) {
    this.panierService.supprimerDuPanier(index);
    this.calculerTotalPrix();
  }
}
