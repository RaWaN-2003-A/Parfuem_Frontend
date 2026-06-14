import { Injectable } from '@angular/core';
import { Parfuem } from './parfuem'; // استيراد واجهة العطور الخاصة بك

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // رابط الباك إند الأساسي (تأكد أن المنفذ 3000 صحيح حسب الباك إند )
  apiUrl = 'http://localhost:3000/api';

  constructor() { }

  // دالة جلب البيانات  (Promise & fetch)
  async getAll(): Promise<Parfuem[]> {
    let response = await fetch(this.apiUrl + '/parfuems');
    let parfuems = await response.json();
    console.log('Parfüms in service (getAll) : ', parfuems);
    return parfuems;
  }
  // دالة لإرسال عطر جديد إلى الباك إند (طريقة POST)
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

  // 1. دالة لجلب بيانات عطر واحد فقط (عن طريق الـ ID) لعرضها في الفورم
  async getOne(id: string): Promise<Parfuem> {
    let response = await fetch(this.apiUrl + '/parfuems/' + id);
    return await response.json();
  }

  // 2. دالة لإرسال التعديلات الجديدة للباك إند (طريقة PUT)
  async update(id: string, parfuem: Parfuem): Promise<Parfuem> {
    let response = await fetch(this.apiUrl + '/parfuems/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parfuem)
    });
    return await response.json();
  }

  // دالة لحذف عطر بناءً على الـ ID الخاص به (طريقة DELETE)
  async delete(id: string): Promise<void> {
    await fetch(this.apiUrl + '/parfuems/' + id, {
      method: 'DELETE'
    });
    console.log('Parfüm Erfolgreich gelöscht!',id );
  }
}
