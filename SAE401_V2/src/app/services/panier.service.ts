import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  bagItemNumber: BehaviorSubject<number>;
  totalPrix: BehaviorSubject<number>;
  panierBoxes: BehaviorSubject<any[]>;

  constructor() {
    this.bagItemNumber = new BehaviorSubject(0);
    this.totalPrix = new BehaviorSubject(0);
    this.panierBoxes = new BehaviorSubject<any[]>([]);
  }

  changeBoxNumber(newNumber: number) {
    this.bagItemNumber.next(newNumber);
  }

  checkNewBag() {
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let currentUser = localStorage.getItem("currentUser");
    let bagCount = 0;

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === currentUser && allUsers[i].hasOwnProperty("panier")) {
        bagCount = allUsers[i].panier.length;
        break;
      }
    }

    this.changeBoxNumber(bagCount);
  }

  addToPanier(box: any) {
    let currentPanier = this.panierBoxes.value.slice();
    currentPanier.push(box);
    this.panierBoxes.next(currentPanier);
    this.changeBoxNumber(currentPanier.length);
    this.calculTotal();
  }

  calculTotal() {
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let currentUser = localStorage.getItem("currentUser");
    let total = 0;

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === currentUser && allUsers[i].hasOwnProperty("panier")) {
        let bagBoxes = allUsers[i].panier;

        for (let j = 0; j < bagBoxes.length; j++) {
          let multiplication = bagBoxes[j].price * bagBoxes[j].quantity;
          total += multiplication;
        }
      }
    }

    this.totalPrix.next(total);
  }

  removeBox(id: any) {
    let currentPanier = this.panierBoxes.value.slice();
    const index = currentPanier.findIndex(item => item.id === id);
    if (index !== -1) {
      currentPanier.splice(index, 1);
      this.panierBoxes.next(currentPanier);
      this.changeBoxNumber(currentPanier.length);
      this.calculTotal();
    }
  }

  clearPanier() {
    this.panierBoxes.next([]);
    this.changeBoxNumber(0);
    this.totalPrix.next(0);
  }


}
