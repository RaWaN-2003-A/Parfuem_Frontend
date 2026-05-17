import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  parfuems: Parfuem[] = [];

  constructor(private backendService: BackendService) {}

  // استخدام async/await لاستقبال البيانات كما فعلنا في الخدمة
  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    try {
      this.parfuems = await this.backendService.getAll();
      console.log('تم العرض في الجدول بنجاح:', this.parfuems);
    } catch (error) {
      console.error('حدث خطأ في جلب العطور:', error);
    }
  }

  // دالة تُستدعى عند الضغط على زر الحذف في الجدول
  async deleteParfuem(id: string | undefined) {
    if (!id) return; // التأكد من وجود ID
    
    // إظهار رسالة تأكيد لطيفة للمستخدم قبل الحذف
    const confirmDelete = confirm('Möchten Sie dieses Parfüm wirklich löschen? (هل تريد حقاً حذف هذا العطر؟)');
    
    if (confirmDelete) {
      await this.backendService.delete(id); // نحذف العطر من الباك إند
      await this.loadData(); // نحدث الجدول فوراً ليختفي العطر المحذوف
    }
  }
}