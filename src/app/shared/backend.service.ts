import { Injectable } from '@angular/core';
import { Parfuem } from './parfuem'; // استيراد واجهة العطور الخاصة بك

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // رابط الباك إند الأساسي (تأكدي أن المنفذ 3000 صحيح حسب الباك إند عندك)
  apiUrl = 'http://localhost:3000/api';

  constructor() { }

  // دالة جلب البيانات بالطريقة التي طلبها الدكتور (Promise & fetch)
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
}
