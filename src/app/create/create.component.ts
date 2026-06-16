// ================================================
// CREATE COMPONENT – Neues Parfüm hinzufügen
// Verwendet ReactiveFormsModule mit FormGroup
// Nach dem Speichern: Toast anzeigen → weiterleiten
// ================================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-create',
  standalone: true,
  // CommonModule: für @if im Template
  // ReactiveFormsModule: für [formGroup] und formControlName
  // RouterLink: für den Abbrechen-Button
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  // saved: steuert ob Toast oder Formular angezeigt wird
  saved: boolean = false;

  // savedParfuem: speichert das zurückgegebene Objekt aus der DB
  savedParfuem!: Parfuem;

  // FormGroup: enthält alle Felder des Formulars als FormControls
  // Validators: prüft ob Felder ausgefüllt sind (required, min, minLength)
  form = new FormGroup({
    nameControl:        new FormControl('',  [Validators.required, Validators.minLength(2)]),
    markeControl:       new FormControl('',  [Validators.required]),
    kategorieControl:   new FormControl('',  [Validators.required]),
    beschreibungControl:new FormControl('',  [Validators.required, Validators.minLength(10)]),
    preisControl:       new FormControl(0,   [Validators.required, Validators.min(1)]),
    groesseControl:     new FormControl('',  [Validators.required]),
    bestandControl:     new FormControl(0),
    bildUrlControl:     new FormControl(''),
    featuredControl:    new FormControl(false)
  });

  // BackendService und Router per Dependency Injection
  constructor(private bs: BackendService, private router: Router) {}

  // speichern(): wird beim Absenden des Formulars aufgerufen
  // Prüft ob alle Pflichtfelder gültig sind (form.valid)
  speichern(): void {
    if (this.form.valid) {
      const values = this.form.value;

      // Neues Parfüm-Objekt aus Formularwerten zusammenbauen
      const neuesParfuem: Parfuem = {
        name:         values.nameControl         || '',
        marke:        values.markeControl        || '',
        kategorie:    values.kategorieControl    || '',
        beschreibung: values.beschreibungControl || '',
        preis:        Number(values.preisControl) || 0,
        groesse:      values.groesseControl      || '',
        bildUrl:      values.bildUrlControl      || '',
        featured:     values.featuredControl     || false
      };

      // POST-Anfrage an Backend: neues Parfüm in MongoDB speichern
      this.bs.create(neuesParfuem)
        .then(response => {
          this.savedParfuem = response; // Antwort der DB speichern
          this.saved = true;            // Toast anzeigen
          console.log('Neues Parfüm gespeichert:', response);
        });
    }
  }

  // confirm(): wird nach dem Toast-OK-Button aufgerufen
  // Leitet zur Tabellen-Seite weiter
  confirm(): void {
    this.router.navigate(['/table']);
  }
}