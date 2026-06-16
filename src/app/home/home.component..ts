// HOME COMPONENT – Logik für die Startseite
// Lädt beim Start die featured Parfüms (featured=true)
// und zeigt sie als Karten auf der Startseite an

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core'; // ElementRef und ViewChild für den Zugriff auf das Video-Element im HTML, AfterViewInit für die Initialisierung nach dem Laden des HTML
import { CommonModule } from '@angular/common'; // CommonModule: für @If, @For, und die slice-Pipe in der HTML-Template
import { RouterLink } from '@angular/router'; // RouterLink: für die Navigation zu den Detailseiten der Parfüms in den Buttons und Karten
import { BackendService } from '../shared/backend.service'; // BackendService: für den Zugriff auf die Parfüm-Daten aus dem Backend
import { Parfuem } from '../shared/parfuem'; // Parfuem: Interface für die Parfüm-Daten, definiert in shared/parfuem.ts

@Component({
  selector: 'app-home',
  standalone: true,
  // Nochmal Importieren
  // CommonModule: für @if, @for, und die slice-Pipe
  // RouterLink: für routerLink in den Buttons und Karten
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {

  // Array für die gefeatured Parfüms (max. 3)
  featuredParfuems: Parfuem[] = [];

  // ViewChild: greift auf das video-Element im HTML zu
  // #heroVideo muss im HTML als Referenz gesetzt sein
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  // BackendService per Dependency Injection
  constructor(private bs: BackendService) {}

  // ngOnInit: wird beim ersten Laden aufgerufen
  // Lädt alle Parfüms und filtert die featured heraus
  ngOnInit(): void {
    this.bs.getAll() // Alle Parfüms vom Backend laden
      .then(data => {
        // filter: nur Parfüms mit featured = true
        // slice(0,3): maximal 3 anzeigen
        this.featuredParfuems = data
          .filter(p => String(p.featured) === 'true') // featured könnte als String oder Boolean kommen, daher String() und Vergleich mit 'true'
          .slice(0, 3); // nur die ersten 3 featured Parfüms nehmen
        console.log('Featured Parfüms geladen:', this.featuredParfuems); // Debug-Ausgabe der geladenen featured Parfüms
      });
  }

  // ngAfterViewInit: wird NACH dem Laden des HTML aufgerufen
  // Setzt muted programmatisch — wichtig für Chrome/Firefox autoplay
  ngAfterViewInit(): void {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      // muted muss per JavaScript gesetzt werden
      // weil Browser das HTML-Attribut manchmal ignorieren
      this.heroVideo.nativeElement.muted = true; // Video stumm schalten
      this.heroVideo.nativeElement.play() // Autoplay starten
        .catch(err => console.log('Video autoplay blockiert:', err)); // Fehler abfangen, falls Autoplay blockiert wird (z.B. in Safari)
    }
  }
}