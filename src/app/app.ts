import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ],//Wir haben die Parfüm-Liste in die offizielle Gästeliste (imports) der Haupt-App eingetragen
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Parfuem_Frontend';
}