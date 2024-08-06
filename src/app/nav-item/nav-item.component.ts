import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a [routerLink]="link.linkPath">
      <div class="nav-element">{{link.title}}</div>
    </a>
  `,
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input({ required: true }) link!: {linkPath: string, title: string};
}
