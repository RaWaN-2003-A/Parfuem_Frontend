import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParfuemListe } from './parfuem-liste/parfuem-liste'; // hier haben wir Angular den genauen Pfad gegeben wo die Datei liegt

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParfuemListe],//Wir haben die Parfüm-Liste in die offizielle Gästeliste (imports) der Haupt-App eingetragen
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Parfuem_Frontend';
}