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