// ============================================
// TABLE COMPONENT
// Lädt alle Parfüms aus der DB und zeigt sie
// in einer Tabelle an.
// Funktionen: Anzeigen, Löschen (mit Modal)
// ============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  // Liste aller Parfüms, die aus dem Backend geladen werden.
  // Die HTML-View zeigt diese Liste direkt an (z.B. via @for ...).
  parfuems: Parfuem[] = [];

  // Das Parfüm, das aktuell im "Löschen?"-Modal angezeigt wird.
  // Wird in delete(id) gesetzt (damit der Name im Modal angezeigt werden kann).
  selectedParfuem!: Parfuem;

  // Steuervariable für das Modal.
  // - false: normale Tabellenansicht
  // - true: Modal (Bestätigung) wird eingeblendet
  deleteStatus: boolean = false;

  // BackendService per Dependency Injection.
  // bs steht für "BackendService" und kapselt alle API-Aufrufe.
  constructor(private bs: BackendService) {}

  // Angular-Lifecycle: wird einmalig aufgerufen, nachdem die Komponente initialisiert wurde.
  // Hier holen wir die Startdaten (alle Parfüms) aus dem Backend.
  ngOnInit(): void {
    this.bs.getAll()
      .then(response => {
        // Response enthält die Parfüms aus der Datenbank.
        this.parfuems = response;
        // Hinweis fürs Debugging während der Entwicklung.
        console.log('Geladene Parfüms:', this.parfuems);
      })
      .catch(err => {
        // Wenn der API-Call fehlschlägt, loggen wir den Fehler.
        console.error('Fehler beim Laden:', err);
      });
  }

  // Wird im HTML-Modal / vom Löschen-Button aufgerufen.
  // Ablauf:
  // 1) ID des angeklickten Parfüms prüfen
  // 2) vollständiges Parfüm aus dem Backend holen (damit der Name/Details im Modal da sind)
  // 3) Modal einschalten (deleteStatus = true)
  delete(id: string | undefined): void {
    // Falls kein gültiger Parameter übergeben wurde: keine Aktion.
    if (!id) return;

    // Hole das ausgewählte Parfüm anhand seiner DB-ID.
    this.bs.getOne(id)
      .then(response => {
        // Speichere das geladene Parfüm fürs Modal.
        this.selectedParfuem = response;
        // Zeige das Bestätigungs-Modal.
        this.deleteStatus = true;
      })
      .catch(err => {
        // Fehlerfall: Parfüm konnte nicht geladen werden.
        console.error('Fehler beim Laden des Parfüms:', err);
      });
  }

  // Wird im HTML-Modal aufgerufen, wenn der Nutzer "Löschen" bestätigt.
  // Ablauf:
  // 1) ID des ausgewählten Parfüms ermitteln
  // 2) delete(id) im Backend ausführen
  // 3) danach Liste neu laden, damit die Tabelle aktuell ist
  confirm(): void {
    // MongoDB-ID liegt typischerweise im Feld _id.
    // Optionales Chaining, damit der Code nicht crasht falls selectedParfuem noch nicht gesetzt wurde.
    const id = this.selectedParfuem?._id;
    if (!id) return;

    // 1) Löschen im Backend
    this.bs.delete(id)
      .then(() => {
        // 2) Danach direkt die aktualisierte Liste laden.
        return this.bs.getAll();
      })
      .then(response => {
        // 3) UI aktualisieren
        this.parfuems = response;
        // Modal wieder schließen.
        this.deleteStatus = false;
      })
      .catch(err => {
        // Fehlerfall beim Löschen oder beim anschließenden Reload.
        console.error('Fehler beim Löschen:', err);
      });
  }

  // Wird im HTML-Modal aufgerufen, wenn der Nutzer "Abbrechen" wählt.
  // Keine Backend-Aktion, nur Modal schließen.
  cancel(): void {
    this.deleteStatus = false;
  }

  // Fallback (falls irgendwo noch Abbrechen() verwendet wird).
  Abbrechen(): void {  // Auf deutsch, damit es im HTML-Template direkt aufgerufen werden kann.
    this.cancel();
  }
}


