import { Component } from '@angular/core';
import { RouterLink , RouterLinkActive} from '@angular/router'; // impotiert die Router ansta

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
isMenuCollapsed : boolean = true;
}