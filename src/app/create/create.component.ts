// ================================================
// CREATE COMPONENT – Neues Parfüm hinzufügen
// Verwendet ReactiveFormsModule mit FormGroup
// Nach dem Speichern: Toast anzeigen → weiterleiten
// ================================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // ReactiveFormsModule: für [formGroup] und formControlName, FormGroup/FormControl: für die Formularstruktur, Validators: für die Validierung der Felder
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
    nameControl:        new FormControl('',  [Validators.required, Validators.minLength(2)]), // Name soll mindestens 2 Zeichen haben
    markeControl:       new FormControl('',  [Validators.required]),// Marke soll ausgefüllt werden
    kategorieControl:   new FormControl('',  [Validators.required]), // Kategorie soll ausgewählt werden
    beschreibungControl:new FormControl('',  [Validators.required, Validators.minLength(20)]), // Beschreibung soll mindestens 20 Zeichen haben
    preisControl:       new FormControl(0,   [Validators.required, Validators.min(1)]), // Preis soll mindestens 1 sein
    groesseControl:     new FormControl('',  [Validators.required]), // Größe soll ausgewählt werden
    bestandControl:     new FormControl(0),
    bildUrlControl:     new FormControl(''),
    featuredControl:    new FormControl(false) // Featured soll als Checkbox ausgefüllt werden, daher default false#
  });

  // BackendService und Router per Dependency Injection
  constructor(private bs: BackendService, private router: Router) {} // BackendService: für die Kommunikation mit der API, Router: für die Navigation nach dem Speichern

  // speichern(): wird beim Absenden des Formulars aufgerufen
  // Prüft ob alle Pflichtfelder gültig sind (form.valid)
  speichern(): void { // Wenn das Formular gültig ist, werden die Werte aus der FormGroup in ein neues Parfüm-Objekt umgewandelt und an die create-Methode des BackendService gesendet, um es in der Datenbank zu speichern. Nach erfolgreichem Speichern wird ein Toast angezeigt und die Antwort der DB im savedParfuem gespeichert.
    if (this.form.valid) { // form.valid prüft alle Validatoren der FormControls, z.B. ob required-Felder ausgefüllt sind und ob die Mindestlänge eingehalten wird
      const values = this.form.value; // Alle Werte aus der FormGroup in einem Objekt

      // Neues Parfüm-Objekt aus Formularwerten zusammenbauen
      const neuesParfuem: Parfuem = {
        name:         values.nameControl         || '', // || '' sorgt dafür, dass bei undefined oder null ein leerer String verwendet wird
        marke:        values.markeControl        || '', // Bei Preis wird 0 verwendet, wenn kein gültiger Wert eingegeben wurde
        kategorie:    values.kategorieControl    || '', // Alle Felder werden mit || '' oder || 0 abgesichert, damit kein undefined oder null in die DB kommt
        beschreibung: values.beschreibungControl || '',  // Beschreibung wird mit || '' abgesichert
        preis:        Number(values.preisControl) || 0, // Preis muss als Zahl gespeichert werden, daher Number() und Absicherung mit || 0
        bestand:      Number(values.bestandControl) || 0, // Bestand wird mit || 0 abgesichert, damit es immer eine Zahl ist
        groesse:      values.groesseControl      || '', // Groesse wird mit || '' abgesichert
        bildUrl:      values.bildUrlControl      || '', // Bild-URL wird mit || '' abgesichert
        featured:     values.featuredControl     || false // Featured wird mit || false abgesichert, damit es immer einen Boolean-Wert hat
      };

      // POST-Anfrage an Backend: neues Parfüm in MongoDB speichern
      this.bs.create(neuesParfuem) // sendet das neue Parfüm-Objekt an die create-Methode des BackendService, die eine POST-Anfrage an die API schickt
        .then(response => {
          this.savedParfuem = response; // Antwort der DB speichern 
          this.saved = true;            // Toast anzeigen lassen
          console.log('Neues Parfüm gespeichert:', response); // Debug-Ausgabe des gespeicherten Parfüms
        });
    }
  }

  // confirm(): wird nach dem Toast-OK-Button aufgerufen
  // Leitet zur Tabellen-Seite weiter
  confirm(): void { // Router: Navigation zu /table
    this.router.navigate(['/table']); // Weiterleitung zur Tabelle nach Bestätigung im Toast
  }
}