import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- WICHTIG für die Links im Footer es soll importiert werden, damit die RouterLink Direktive in der Footer-Komponente verwendet werden kann

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink], // <-- Hier hinzufügen
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}