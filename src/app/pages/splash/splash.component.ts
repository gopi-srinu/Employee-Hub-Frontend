import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent {
  constructor(private router: Router) {}

  navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }
}
