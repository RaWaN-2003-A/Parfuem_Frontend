// ================================================
// DETAIL COMPONENT – Parfüm bearbeiten (UPDATE)
// Lädt Daten basierend auf ID aus der URL
// Verwendet PATCH um nur geänderte Felder zu senden
// PATCH ist besser als PUT weil nur Änderungen gesendet
// ================================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-detail',
  standalone: true,
  // CommonModule: für @if, @else
  // ReactiveFormsModule: für FormGroup
  // RouterLink: für den Abbrechen-Button
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  // ID des Parfüms aus der URL (z.B. /detail/507f191e810c19729de860ea)
  id: string = '';

  // Das geladene Parfüm-Objekt
  parfuem!: Parfuem;

  // saved: steuert ob Toast oder Formular angezeigt wird
  saved: boolean = false;

  // FormGroup: enthält alle Felder für das Update
  form = new FormGroup({
    nameControl:        new FormControl('', [Validators.required]), // wird im HTML mit formControlName="nameControl" gebunden
    markeControl:       new FormControl('', [Validators.required]), 
    kategorieControl:   new FormControl('', [Validators.required]),
    beschreibungControl:new FormControl('', [Validators.required]),
    preisControl:       new FormControl(0,  [Validators.required, Validators.min(1)]), // Preis muss > 0 sein
    groesseControl:     new FormControl('', [Validators.required]),
    bildUrlControl:     new FormControl(''),
    featuredControl:    new FormControl(false) // Checkbox, true/false
  });

  // ActivatedRoute: zum Auslesen der URL-Parameter
  // BackendService: für die HTTP-Anfragen
  // Router: zum Navigieren nach dem Speichern
  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private router: Router
  ) {}

  // ngOnInit: wird beim Laden aufgerufen
  // 1. ID aus URL auslesen
  // 2. Parfüm aus der DB laden
  // 3. Daten in das Formular eintragen
  ngOnInit(): void {
    // this.route.snapshot.paramMap: Zugriff auf URL-Parameter
    // z.B. /detail/507f191e810c19729de860ea → id = "507f191e810c19729de860ea"
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      // GET-Request: hole das einzelne Parfüm basierend auf ID
      this.bs.getOne(this.id)
        .then(response => {
          this.parfuem = response;
          console.log('Parfüm geladen:', this.parfuem);

          // Daten in das Formular eintragen (patchValue: nur gespeicherte Werte)
          this.form.patchValue({
            nameControl:        this.parfuem?.name,
            markeControl:       this.parfuem?.marke,
            kategorieControl:   this.parfuem?.kategorie,
            beschreibungControl:this.parfuem?.beschreibung,
            preisControl:       this.parfuem?.preis,
            groesseControl:     this.parfuem?.groesse,
            bildUrlControl:     this.parfuem?.bildUrl,
            featuredControl:    this.parfuem?.featured
          });
        });
    }
  }

  // aktualisieren(): wird beim Absenden des Formulars aufgerufen
  // Prüft Validierung und schickt PATCH-Request zum Backend
  aktualisieren(): void {
    if (this.form.valid) {
      const values = this.form.value;

      // Aktualisiertes Parfüm-Objekt aus Formularwerten
      this.parfuem.name         = values.nameControl!;
      this.parfuem.marke        = values.markeControl!;
      this.parfuem.kategorie    = values.kategorieControl!;
      this.parfuem.beschreibung = values.beschreibungControl!;
      this.parfuem.preis        = Number(values.preisControl);
      this.parfuem.groesse      = values.groesseControl!;
      this.parfuem.bildUrl      = values.bildUrlControl!;
      this.parfuem.featured     = values.featuredControl!;

      // PATCH-Request: sendet die Änderungen zur DB
      // PATCH ist besser als PUT: nur Änderungen, nicht ganzes Objekt
      this.bs.update(this.id, this.parfuem)
        .then(() => {
          this.saved = true; // Toast anzeigen
          console.log('Parfüm aktualisiert:', this.parfuem);
        });
    }
  }

  // confirm(): nach Toast-OK-Button
  // Navigiert zur Tabellen-Seite
  confirm(): void {
    this.router.navigate(['/table']);
  }

  // abbrechen(): beim Klick auf Abbrechen-Button
  // Navigiert ohne Speichern zurück
  abbrechen(): void {
    this.router.navigate(['/table']);
  }
}