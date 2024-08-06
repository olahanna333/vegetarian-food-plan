import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavItemComponent],
  template: `
    <div class="content">
      <header class="header">
        <a routerLink=""><img class="logo" src="/assets/mort-logo.jpg" alt="logo" aria-hidden="true"></a>
      </header>
      <nav>
        <app-nav-item [link]="{linkPath: '', title:'Home'}"/>
        <app-nav-item [link]="{linkPath: '/recipes', title:'Recipes'}"/>
        <app-nav-item [link]="{linkPath: '/favorite', title:'Favorites'}"/>
        <app-nav-item [link]="{linkPath: '/plan', title:'My Plan'}"/>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>&copy; Copyright 2024 Olah Anna</footer>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
