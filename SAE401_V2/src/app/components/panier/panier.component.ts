import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  bagBoxes: any[] = []; 
  totalPrix: number = 0;
  noBoxFound: boolean = true; 

  constructor() { }

  ngOnInit(): void {
  }


  suppBox(itemID: any): void {
 
  }


  Commander(): void {
  }
}
