import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedLevel: string = 'easy';
  constructor(private router: Router) {}
  onLevelChange() {
    if (this.selectedLevel === 'easy') {
      this.router.navigate(['/easy']);
    } else if (this.selectedLevel === 'hard') {
      this.router.navigate(['/hard']);
    }
  }
}
