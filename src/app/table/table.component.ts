import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
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
}