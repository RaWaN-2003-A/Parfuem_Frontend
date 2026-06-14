// ================================================
// HOME COMPONENT – Logik für die Startseite
// Lädt beim Start die featured Parfüms (featured=true)
// und zeigt sie als Karten auf der Startseite an
// ================================================

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-home',
  standalone: true,
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
    this.bs.getAll()
      .then(data => {
        // filter: nur Parfüms mit featured = true
        // slice(0,3): maximal 3 anzeigen
        this.featuredParfuems = data
          .filter(p => String(p.featured) === 'true') // featured könnte als String oder Boolean kommen, daher String() und Vergleich mit 'true'
          .slice(0, 3);
        console.log('Featured Parfüms geladen:', this.featuredParfuems);
      });
  }

  // ngAfterViewInit: wird NACH dem Laden des HTML aufgerufen
  // Setzt muted programmatisch — wichtig für Chrome/Firefox autoplay
  ngAfterViewInit(): void {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      // muted muss per JavaScript gesetzt werden
      // weil Browser das HTML-Attribut manchmal ignorieren
      this.heroVideo.nativeElement.muted = true;
      this.heroVideo.nativeElement.play()
        .catch(err => console.log('Video autoplay blockiert:', err));
    }
  }
}