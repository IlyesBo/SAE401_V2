import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  box = {
    id: 1,
    name: 'Box 1',
    price: 25.99,
    image: 'assets/images/box1.jpg'
  };

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
  }

  addToPanier(box: any) {
    this.panierService.addToPanier(box);
  }
}
