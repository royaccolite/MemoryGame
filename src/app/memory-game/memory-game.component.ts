import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

//---------
// import party from "party-js";
//---------

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss',
  

})

export class MemoryGameComponent implements OnInit {
  rows = 3;
  columns = 2;
  totalCards = this.rows * this.columns;
  cards: string[] = [];
  revealed: boolean[] = [];
  selectedIndices: number[] = [];
  moves = 0;
  misses = 0;
  rounds = 0;
  gameEndMessage: string = '';

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.cards = this.generateCardImages();
    this.revealed = Array(this.totalCards).fill(false);
    this.selectedIndices = [];
    this.moves = 0;
    this.misses = 0;
  }

  generateCardImages(): string[] {
    const images = this.rows * this.columns === 12
      ? ['sasuke', 'kakashi', 'naruto', 'hinata', 'madara', 'pain']
      : ['sasuke', 'kakashi', 'naruto'];
    const pairs = images.concat(images);
    return this.shuffleArray(pairs);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleClick(index: number): void {
    if (this.revealed[index] || this.selectedIndices.length === 2) {
      return;
    }

    this.revealed[index] = true;
    this.selectedIndices.push(index);

    if (this.selectedIndices.length === 2) {
      this.moves++;
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  checkMatch(): void {
    const [index1, index2] = this.selectedIndices;

    if (this.cards[index1] === this.cards[index2]) {
      this.revealed[index1] = true;
      this.revealed[index2] = true;

      this.cards[index1] = 'matched';
      this.cards[index2] = 'matched';

      this.checkGameEnd();
    } else {
      this.misses++;
      this.revealed[index1] = false;
      this.revealed[index2] = false;
    }
    this.selectedIndices = [];
  }

  checkGameEnd(): void {
    if (this.revealed.every((value) => value)) {
      this.rounds++;
      alert(`Game Over! Rounds: ${this.rounds}, Total Moves: ${this.moves}, Total Misses: ${this.misses}`);
      this.initializeGame();
    }
  }
  getCardImage(card: string, isRevealed: boolean): string {
    return isRevealed ? `assets/${card}.jpg` : 'assets/card-back.jpg';
  }
  
}
