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
import { NavService } from '../../services/nav.service';
import { HeaderService } from '../../services/header.service';
import { Subscription } from 'rxjs';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy{

  panierBoxes: any[] = [];
  totalPrix: number = 0;
  subscription: Subscription;
  noBoxFound: boolean = false;

  constructor(private router: Router, private nav: NavService, private header: HeaderService, private panierService: PanierService) {
    this.subscription = this.panierService.totalPrix.subscribe((value) => {
      this.totalPrix = value;
    })
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser") || "";
    if (currentUser == "") {
      this.router.navigate([`/app-connexion`]);
    }
    this.nav.changeActive("panier");
    this.header.greenPanier(true);
    this.panierService.checkNewPanier();

    // Récupération des informations nécessaires
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let userID = allUsers.findIndex(user => user.email === currentUser);

    if (userID !== -1) {
      this.panierBoxes = allUsers[userID]?.panierContent || [];
      this.panierService.calculTotal();
      this.checkBox();
    }
  }

  ngOnDestroy(): void {
    this.header.greenPanier(false);
    this.subscription.unsubscribe();
  }

  // Supprimer un article du panier
  suppBox(id: any) {
    this.panierService.removeBox(id);
    this.panierBoxes = this.panierService.getPanierBoxes();
    this.panierService.calculTotal();
    this.checkBox();
  }

  // Vérifier si le panier est vide
  checkBox() {
    this.noBoxFound = this.panierBoxes.length === 0;
  }

  // Passer une commande
  Commander() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const commandeNumber = this.panierService.getNextCommandeNumber(currentUser);
      const historiqueItem = {
        boxes: this.panierBoxes,
        price: this.totalPrix,
        commandeNumber: commandeNumber
      };
      this.panierService.addToHistorique(currentUser, historiqueItem);
      this.panierService.clearPanier(currentUser);
      this.router.navigate(['/app-compte']);
    }
  }
}
>>>>>>> a30a495c9d340a178712c8ee1050bbad88275e6f
