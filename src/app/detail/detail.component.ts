// ================================================
// DETAIL COMPONENT – Parfüm bearbeiten (UPDATE)
// Lädt Daten basierend auf ID aus der URL
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  id: string = '';
  parfuem!: Parfuem;
  saved: boolean = false;

  form = new FormGroup({
    nameControl:        new FormControl('', [Validators.required]),
    markeControl:       new FormControl('', [Validators.required]),
    kategorieControl:   new FormControl('', [Validators.required]),
    beschreibungControl:new FormControl('', [Validators.required]),
    preisControl:       new FormControl(0,  [Validators.required, Validators.min(1)]),
    groesseControl:     new FormControl('', [Validators.required]),
    bildUrlControl:     new FormControl(''),
    bestandControl:     new FormControl(0,  [Validators.required]),
    featuredControl:    new FormControl(false)
  });

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('DetailComponent: ID aus URL:', this.id);

    if (this.id) {
      // 💡 LÖSUNG: Wir holen alle Parfüms und filtern das richtige heraus!
      // Das umgeht den 404-Fehler vom Backend (da getOne aktuell zickt).
      this.bs.getAll()
        .then(alleParfuems => {
          // Wir suchen das Parfüm in der Liste
          const gefunden = alleParfuems.find((p: any) => p._id === this.id || p.id === this.id);

          if (gefunden) {
            this.parfuem = gefunden;
            console.log('Parfüm erfolgreich lokal geladen:', this.parfuem);

            // Daten in das Formular eintragen
            this.form.patchValue({
              nameControl:        this.parfuem.name,
              markeControl:       this.parfuem.marke,
              kategorieControl:   this.parfuem.kategorie,
              beschreibungControl:this.parfuem.beschreibung,
              preisControl:       this.parfuem.preis,
              bestandControl:     this.parfuem.bestand || 0,
              groesseControl:     this.parfuem.groesse,
              bildUrlControl:     this.parfuem.bildUrl,
              featuredControl:    this.parfuem.featured
            });
          } else {
            console.error('FEHLER: Parfüm in der Liste nicht gefunden!');
          }
        })
        .catch(err => {
          console.error('Fehler beim Laden der Parfüms:', err);
        });
    }
  }

  aktualisieren(): void {
    if (this.form.valid) {
      const values = this.form.value;

      // Neues Objekt bauen, um Fehler zu vermeiden
      const updateDaten = {
        _id:          this.id,
        name:         values.nameControl         || '',
        marke:        values.markeControl        || '',
        kategorie:    values.kategorieControl    || '',
        beschreibung: values.beschreibungControl || '',
        preis:        Number(values.preisControl) || 0,
        bestand:     Number(values.bestandControl) || 0,
        groesse:      values.groesseControl      || '',
        bildUrl:      values.bildUrlControl      || '',
        featured:     values.featuredControl     || false
      };

      // PATCH-Request an Backend
      this.bs.update(this.id, updateDaten as Parfuem)
        .then(() => {
          this.saved = true;
          console.log('Parfüm erfolgreich aktualisiert:', updateDaten);
        })
        .catch(err => {
          console.error('Fehler beim Aktualisieren im Backend:', err);
        });
    }
  }

  confirm(): void {
    this.router.navigate(['/table']);
  }

  abbrechen(): void {
    this.router.navigate(['/table']);
  }
}