import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
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
export class PanierComponent implements OnInit, OnDestroy {

  panierBoxes: any[] = [];
  totalPrix: number = 0;
  subscription: Subscription;
  noBoxFound: boolean = false;

  constructor(private router: Router, @Inject(NavService)private nav: NavService, private header: HeaderService, private panierService: PanierService) {
    this.subscription = this.panierService.totalPrix.subscribe((value) => {
      this.totalPrix = value;
    })
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser") || "";
    if (currentUser == "") {
      this.router.navigate(['/app-connexion']);
    }
    this.nav.changeActive("panier");
    this.header.greenPanier(true);
    this.panierService.checkNewBag();

    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === currentUser && allUsers[i].hasOwnProperty("panier")) {
        this.panierBoxes = allUsers[i].panier;
        this.panierService.calculTotal();
        this.checkBox();
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.header.greenPanier(false);
    this.subscription.unsubscribe();
  }

  supprimerDuPanier(id: any) {
    this.panierService.removeBox(id);
    // Mise à jour des données après la suppression
    this.panierBoxes = this.panierService.panierBoxes.value;
    this.panierService.calculTotal();
    this.checkBox();
  }

  checkBox() {
    this.noBoxFound = this.panierBoxes.length === 0;
  }
  Commander(): void {
    // Vérifiez si le panier est vide
    if (this.panierBoxes.length === 0) {
      console.error('Le panier est vide.');
      return;
    }
  }

}
