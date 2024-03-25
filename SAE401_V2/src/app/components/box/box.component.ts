import { Component, OnInit } from '@angular/core';

// Add export here
export class BoxComponent implements OnInit {
  box = {
    id: 1,
    name: 'Box 1',
    price: 25.99,
    image: 'assets/images/box1.jpg'
  };

  constructor() { }

  ngOnInit(): void {
  }
}