// board.component.ts

import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CardComponent } from '../card/card.component';
interface Card {
  value: string;
  flipped: boolean;
  isMatched: boolean;
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  // cards: { value: string }[] = [
  //   { value: 'A' }, { value: 'B' }, { value: 'C' }, { value: 'D' },
  //   { value: 'A' }, { value: 'B' }, { value: 'C' }, { value: 'D' },
  //   { value: 'E' }, { value: 'F' }, { value: 'G' }, { value: 'H' },
  //   { value: 'E' }, { value: 'F' }, { value: 'G' }, { value: 'H' },
  // ];
  
  flippedCards: CardComponent[] = [];
  isFlipping = false;
  stepCount = 0;
  missedAttempts = 0;
  selectedSpeed: 'Slow' | 'Normal' | 'Faster' = 'Normal'; 
  selectedCardOption: '6' | '12' = '6'; // Added variable for selected card option
  numRows = this.getNumRows(); // Added function to calculate the number of rows
  numCols = 3;
  uniqueValues = ['A', 'B', 'C', 'D', 'E', 'F']; // Adjust the number of unique values based on the card option
  cards: Card[] = this.generateCards();
  transitionTimes = {
    'Slow': 10000,
    'Normal': 2000,
    'Faster': 500
  };
  transitionTime = this.transitionTimes[this.selectedSpeed] ;
  ngOnInit() {
    this.shuffleCards();
  }
  shuffleCards() {
    this.cards = this.shuffleArray(this.cards);
  }

  // shuffleArray(array: any[]) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

  handleCardClicked(card: CardComponent) {
    if (this.isFlipping || this.flippedCards.length >= 2) {
      return;
    }

    this.flippedCards.push(card);
    
    setTimeout(() => this.checkMatch(), this.transitionTime);
    
    if (this.flippedCards.length === 2) {
      this.isFlipping = true;
      this.stepCount++; 
      setTimeout(() => this.checkMatch(), 1000);
    }
  
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.value === card2.value) {
      // If the cards match, reset them and remove from the flippedCards array
      card1.resetCard();
      card2.resetCard();
      this.flippedCards = [];
      if (this.allCardsMatched()) {
        // Display Congratulations message
        console.log('Congratulations! All cards matched!');
      }
    } else {
      // If the cards don't match, flip them back
      this.flippedCards.forEach((card) => (card.flipped = false));
      this.flippedCards = [];
      this.missedAttempts++;
    }

    this.isFlipping = false;
  }
  public allCardsMatched(): boolean {
    if (!this.cardComponents) {
      return false; // Return false if cardComponents is undefined
    }
    const cardArray = this.cardComponents.toArray();
    return cardArray.every((card) => card.isMatched);
  }
  onSpeedChange() {
    // Update the transition time based on the selected speed
    this.transitionTime = this.transitionTimes[this.selectedSpeed] ;
  }

  onCardOptionChange() {
    this.numRows = this.getNumRows();
    this.cards = this.generateCards(); // Regenerate cards based on the new option
  }

  private getNumRows(): number {
    return this.selectedCardOption === '6' ? 2 : 4;
  }
  
  private generateCards(): Card[] {
    const numPairs = (this.numRows * this.numCols) / 2;
    const shuffledValues = this.shuffleArray(this.uniqueValues.slice(0, numPairs));
    const cardValues = [...shuffledValues, ...shuffledValues]; // Duplicate values to create pairs
  
    const cards: Card[] = cardValues.map((value) => ({ value, flipped: false, isMatched: false }));
    return this.shuffleArray(cards);
  }
  private shuffleArray<T>(array: T[]): T[] {
    // Function to shuffle an array (Fisher-Yates algorithm)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
