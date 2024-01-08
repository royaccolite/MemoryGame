import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-fireworks',
  template: `
    <div *ngFor="let firework of fireworks" class="firework" [@fireworkAnimation]="firework.state" (animationend)="onFireworkAnimationEnd(firework)">
    </div>
  `,
  styles: [`
    .firework {
      width: 10px;
      height: 10px;
      background-color: #ffcc00; 
      border-radius: 50%;
      position: absolute;
      animation: fireworkAnimation 1s ease-out;
    }

    @keyframes fireworkAnimation {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.5);
        opacity: 1;
      }
      100% {
        transform: scale(0);
        opacity: 0;
      }
    }
  `],
  animations: [
    trigger('fireworkAnimation', [
      state('show', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition('show => hide', animate('1s ease-out'))
    ])
  ]
})
export class FireworksComponent implements OnInit {
  fireworks: { state: string }[] = [];

  ngOnInit() {
    this.createFireworks();
  }

  createFireworks() {
    for (let i = 0; i < 5; i++) {
      this.fireworks.push({ state: 'show' });
    }
  }

  onFireworkAnimationEnd(firework: any) {
    firework.state = 'hide';
  }
}
