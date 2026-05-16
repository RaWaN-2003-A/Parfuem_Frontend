import { Component, OnInit } from '@angular/core';
import { ParfuemService } from '../parfuem.service';

@Component({
  selector: 'app-parfuem-liste',
  standalone: true,
  imports: [],
  templateUrl: './parfuem-liste.html',
  styleUrl: './parfuem-liste.css'
})
export class ParfuemListe implements OnInit {
  // هنا سنحفظ العطور التي تأتي من الـ Backend
  parfuems: any[] = []; 

  // هنا نقوم باستدعاء "ساعي البريد"
  constructor(private parfuemService: ParfuemService) {}

  // هذه الدالة تعمل تلقائياً أول ما تفتح الصفحة
  ngOnInit(): void {
    this.parfuemService.getParfuems().subscribe({
      next: (daten) => {
        this.parfuems = daten;
        console.log('Erfolgreich! Parfüms wurden geladen:', this.parfuems);
      },
      error: (fehler) => {
        console.error('Fehler beim Laden der Daten: ', fehler);
      }
    });
  }
}