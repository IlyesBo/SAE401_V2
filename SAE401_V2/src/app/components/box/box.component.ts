// box.component.ts
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../panier.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor(public panierService: PanierService) { }

  ngOnInit(): void {
  }

  addToPanier(box: any) {
    this.panierService.ajouterAuPanier(box);
  }
}
