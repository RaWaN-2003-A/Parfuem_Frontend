// ================================================
// NAV COMPONENT – Navigationsleiste
// Steuert das Burger-Menü auf Mobile-Geräten
// ================================================

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',          //Selector für die Verwendung in HTML
  standalone: true,            // Standalone-Komponente, keine NgModule erforderlich
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',   // Pfad zur HTML-Vorlage
  styleUrl: './nav.component.css'        // Pfad zur CSS-Datei
})
export class NavComponent {

  // isMenuCollapsed: true = Menü geschlossen, false = offen
  // wird durch den Burger-Button Toggle geschaltet
  isMenuCollapsed: boolean = true;
}