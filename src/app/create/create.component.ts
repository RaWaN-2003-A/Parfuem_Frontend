import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // مهم جداً للتعامل مع النماذج (Forms)
import { Router } from '@angular/router'; // للتحويل لصفحة الجدول بعد الإضافة
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule], // إضافة FormsModule هنا
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  // كائن عطر فارغ لنربطه بحقول الإدخال في الـ HTML
  neuesParfuem: Parfuem = {
    name: '',
    marke: '',
    preis: 0
  };

  constructor(private backendService: BackendService, private router: Router) {}

  // هذه الدالة ستعمل عند الضغط على زر "حفظ"
  async speichern() {
    try {
      await this.backendService.create(this.neuesParfuem);
      // بعد الحفظ بنجاح، ننتقل تلقائياً لصفحة الجدول لنرى العطر الجديد
      this.router.navigate(['/table']);
    } catch (error) {
      console.error('حدث خطأ أثناء الحفظ:', error);
    }
  }
}