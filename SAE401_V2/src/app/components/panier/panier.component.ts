<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

// Add export here
export class PanierComponent implements OnInit {
  items = [
    {
      id: 1,
      name: 'Box 1',
      price: 25.99,
      quantity: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy{

  bagBoxes: any[] = [];
  totalPrix: number = 0;  
  subscription: Subscription;
  noBoxFound: boolean = false;

  constructor(
    private router: Router,
    private panierService: PanierService
  ) {
    this.subscription = this.panierService.totalPrix.subscribe((value) => {
      this.totalPrix = value;
    })
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser") || "";
    if (currentUser === "") {
      this.router.navigate([`/app-connexion`]);
    }
    this.panierService.checkNewPanier();

    // Récupération des éléments du panier
    if (this.panierService.panier.length > 0) {
      this.bagBoxes = this.panierService.panier;
    }

    this.panierService.calculTotal();
    this.checkBox();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  supprimerDuPanier(index: number) {
    this.panierService.supprimerDuPanier(index);
    this.panierService.mettreAJourPanier();
    this.checkBox();
  }

  checkBox() {
    this.noBoxFound = this.bagBoxes.length === 0;
  }

  Commander() {
    this.panierService.commander();
  }
}
>>>>>>> a30a495c9d340a178712c8ee1050bbad88275e6f
