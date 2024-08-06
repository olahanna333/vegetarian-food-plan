import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Plan your own vegetarian diet!</h2>
      <p>This website was created due to practice the Angular framework.</p>
      <p>Recipes copied from <a href="https://www.bbcgoodfood.com/">www.bbcgoodfood.com</a>.</p>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
