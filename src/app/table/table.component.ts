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
  // CommonModule: für @if, @for
  // RouterLink: für [routerLink] im Edit-Button
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  // Array mit allen Parfüms aus der Datenbank
  parfuems: Parfuem[] = [];

  // Das aktuell ausgewählte Parfüm (für das Löschen-Modal)
  selectedParfuem!: Parfuem;

  // Steuert ob das Löschen-Modal angezeigt wird
  deleteStatus: boolean = false;

  // BackendService per Dependency Injection
  constructor(private bs: BackendService) {}

  // ngOnInit: wird beim Laden der Komponente aufgerufen
  // Lädt alle Parfüms aus der Datenbank
  ngOnInit(): void {
    this.bs.getAll()
      .then(response => {
        this.parfuems = response;
        console.log('parfuems in TableComponent:', this.parfuems);
      });
  }

  // Wird im HTML-Modal verwendet
  delete(id: string | undefined): void {
    if (!id) return;
    this.bs.getOne(id)
      .then((response: Parfuem) => {
        this.selectedParfuem = response;
        this.deleteStatus = true;
      })
      .catch((err) => console.error('Fehler beim Laden des Parfüms:', err));
  }

  // Wird im HTML-Modal verwendet
  async confirm(): Promise<void> {
    try {
      // BackendService hat nur delete(id), kein deleteOne()
      const id = this.selectedParfuem?._id;
      if (!id) return;

      await this.bs.delete(id);
      this.parfuems = await this.bs.getAll();
      this.deleteStatus = false;
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
    }
  }

  // cancel(): schließt das Modal ohne zu löschen
  cancel(): void {
    this.deleteStatus = false;
  }

  // Abbrechen(): entspricht cancel() (falls HTML diese Methode aufruft)
  Abbrechen(): void {
    this.cancel();
  }
}