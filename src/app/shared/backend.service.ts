import { Injectable } from '@angular/core';
import { Parfuem } from './parfuem'; // Import der Parfüm-Schnittstelle

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // Basis-URL des Backends. (Port 3000 ggf. anpassen)
  apiUrl = 'http://localhost:3000/api';

  constructor() {}

  // Holt alle Parfüms vom Backend (GET)


  async getAll(): Promise<Parfuem[]> {
    let response = await fetch(this.apiUrl + '/parfuems');
    let parfuems = await response.json();
    console.log('Parfüms in service (getAll) : ', parfuems);
    return parfuems;
  }
  // Erstellt ein neues Parfüm im Backend (POST)

  async create(parfuem: Parfuem): Promise<Parfuem> {
    let response = await fetch(this.apiUrl + '/parfuems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parfuem)
    });
    let savedParfuem = await response.json();
    console.log('Neue Parfüm erfolgreich hinzugefügt:', savedParfuem);
    return savedParfuem;
  }

  // Lädt ein einzelnes Parfüm anhand der ID (für die Formularansicht)

  async getOne(id: string): Promise<Parfuem> {
    let response = await fetch(this.apiUrl + '/parfuems/' + id);
    return await response.json();
  }

  // Aktualisiert ein Parfüm im Backend (PUT)

  async update(id: string, parfuem: Parfuem): Promise<Parfuem> {
    const response = await fetch(this.apiUrl + '/parfuems/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parfuem)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Update failed: ${response.status} ${response.statusText} ${text}`);
    }

    return await response.json();
  }

  // Löscht ein Parfüm anhand der ID (DELETE)

  async delete(id: string): Promise<void> {
    await fetch(this.apiUrl + '/parfuems/' + id, {
      method: 'DELETE'
    });
    console.log('Parfüm erfolgreich gelöscht!', id);

  }
}
