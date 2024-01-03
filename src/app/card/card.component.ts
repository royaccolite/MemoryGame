// card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() value: string='';
  @Output() cardClicked = new EventEmitter();

  flipped = false;
  isMatched = false;

  flipCard() {
    if (!this.flipped) {
      this.flipped = true;
      this.cardClicked.emit(this);
    }
  }

  resetCard() {
    this.flipped = true;
    this.isMatched=true;
  }
  checkMatch() {
    if (this.flipped) {
      this.cardClicked.emit(this);

      if (this.flipped && !this.isMatched) {
        this.isMatched = true; // Set the card as matched
      }
    }
  }

}
